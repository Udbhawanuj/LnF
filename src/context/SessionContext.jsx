import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react"
import { supabase } from "../lib/supabaseClient"


const SessionContext = createContext({
  session: null,
  loading: true
})

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

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

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (mounted) {
          setSession(newSession)
        }
      }
    )

    return () => {
      mounted = false
      authListener?.subscription?.unsubscribe()
    }
  }, [])

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

export const useSession = () => useContext(SessionContext)
