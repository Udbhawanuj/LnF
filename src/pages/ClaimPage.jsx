import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { toast } from "react-hot-toast"

function ClaimPage() {
  const { claimCode } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("claims").insert([
      {
        claim_code: claimCode,
        claimant_name: name,
        claimant_email: email,
        details
      }
    ])

    if (error) {
      console.error(error)
      toast.error("Failed to submit claim")
      setLoading(false)
      return
    }

    try {
      await supabase.functions.invoke("notify-claim", {
        body: { claimCode, name, email, details }
      })
    } catch (fnError) {
      console.warn("Edge function notify-claim not configured:", fnError.message)
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center">
          <h2 className="text-xl font-semibold text-slate-50">Claim submitted</h2>
          <p className="text-xs text-slate-400">
            Thank you. The person who reported this item will review your claim and contact you if
            the details match.
          </p>
        </div>
      </div>
    )
  }

  const inputBase =
    "w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/80"

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-semibold text-slate-50 text-center">
          Claim this item
        </h2>
        <p className="text-xs text-slate-400 text-center">
          Enter your details and briefly explain how this item belongs to you. Your claim will be
          linked to code{" "}
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200">
            {claimCode}
          </span>
          .
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-300" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              className={inputBase}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label className="text-xs text-slate-300" htmlFor="details">
              Why this item is yours
            </label>
            <textarea
              id="details"
              className={inputBase + " min-h-[90px] resize-y"}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
            <p className="text-[11px] text-slate-500">
              Include identifiers like color, brand, unique marks, or what was inside.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-primary-500 py-2 text-sm font-medium text-white hover:bg-primary-400 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit claim"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ClaimPage
