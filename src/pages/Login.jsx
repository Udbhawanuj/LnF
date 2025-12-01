import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { toast } from "react-hot-toast"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Logged in")
      navigate("/app")
    }
  }

  const inputBase =
    "w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/80"

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-center text-xl font-semibold text-slate-50">
          Welcome back
        </h2>
        <p className="text-center text-xs text-slate-400">
          Login to access the Lost &amp; Found dashboard.
        </p>
        <form onSubmit={handleSubmit} className="mt-2 space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputBase}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={inputBase}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-primary-500 py-2 text-sm font-medium text-white hover:bg-primary-400 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        <p className="text-center text-[11px] text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary-300 hover:text-primary-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
