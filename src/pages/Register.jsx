import React, { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { toast } from "react-hot-toast"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Check your email to confirm your account")
    }
  }

  const inputBase =
    "w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/80"

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-center text-xl font-semibold text-slate-50">
          Create an account
        </h2>
        <p className="text-center text-xs text-slate-400">
          Sign up to start reporting and tracking items.
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
              minLength={6}
            />
            <p className="text-[11px] text-slate-500">
              Minimum 6 characters recommended for security.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-primary-500 py-2 text-sm font-medium text-white hover:bg-primary-400 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>
        <p className="text-center text-[11px] text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-300 hover:text-primary-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
