import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-300/80">
            Lost &amp; Found · Campus
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-50 leading-tight">
            Lose less. <span className="text-primary-400">Find faster.</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            A modern Lost &amp; Found portal crafted by <span className="font-medium text-slate-200">Udbhaw Anuj</span>.
            Report lost items, track found belongings, and verify claims securely in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/app"
              className="px-5 py-2.5 rounded-full bg-primary-500 text-sm font-medium text-white hover:bg-primary-400"
            >
              Open dashboard
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full border border-slate-700 text-sm text-slate-200 hover:border-primary-500 hover:text-primary-200"
            >
              Login / Sign up
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-slate-500 pt-4">
            <span>React · Vite · Tailwind</span>
            <span>Supabase Auth &amp; PostgreSQL</span>
            <span>QR-based claim verification</span>
            <span>Responsive UI</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
