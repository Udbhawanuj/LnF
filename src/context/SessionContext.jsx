import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react"
import { supabase } from "../lib/supabaseClient"

// -----------------------------------------------------
// Session Context
// Provides global access to the authenticated user session.
// -----------------------------------------------------

const SessionContext = createContext({
  session: null,
  loading: true
})

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // -----------------------------------------------------
  // Initialize the session on first load
  // -----------------------------------------------------
  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (mounted) {
          setSession(data?.session ?? null)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()

    // -----------------------------------------------------
    // Listener for login/logout/session update events
    // -----------------------------------------------------
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (mounted) {
          setSession(newSession)
        }
      }
    )

    // Cleanup on unmount
    return () => {
      mounted = false
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  // -----------------------------------------------------
  // Memoized value prevents unnecessary re-renders
  // -----------------------------------------------------
  const value = useMemo(
    () => ({ session, loading }),
    [session, loading]
  )

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

// Hook for easy usage
export const useSession = () => useContext(SessionContext)
