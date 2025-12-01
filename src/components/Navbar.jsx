import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useSession } from "../context/SessionContext"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { session } = useSession()
  const isAppRoute = location.pathname.startsWith("/app")

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const userEmail = session?.user?.email

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-700 text-xs font-bold text-white shadow-md shadow-primary-500/40">
            L&amp;F
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              Lost &amp; Found
            </span>
            <span className="text-[10px] text-slate-400">
              Campus item tracker
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs sm:text-sm">
          {isAppRoute && (
            <>
              <Link
                to="/app"
                className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-primary-500 hover:text-primary-200"
              >
                Dashboard
              </Link>
              <Link
                to="/app/report"
                className="rounded-full bg-primary-500 px-3 py-1 font-medium text-white transition hover:bg-primary-400"
              >
                Report item
              </Link>
            </>
          )}

          {session ? (
            <>
              {userEmail && (
                <span className="hidden text-[11px] text-slate-400 sm:inline">
                  {userEmail}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 transition hover:border-rose-500 hover:text-rose-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 transition hover:border-primary-500 hover:text-primary-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary-500 px-3 py-1 text-[11px] font-medium text-white transition hover:bg-primary-400"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
