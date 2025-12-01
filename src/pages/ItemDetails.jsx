import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { toast } from "react-hot-toast"
import StatusBadge from "../components/StatusBadge"
import { QRCodeCanvas } from "qrcode.react"

function ItemDetails() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [claimLink, setClaimLink] = useState("")
  const [copyLabel, setCopyLabel] = useState("Copy link")

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("items").select("*").eq("id", id).single()
      if (error) {
        console.error(error)
        toast.error("Could not load item")
      } else {
        setItem(data)
        const url = `${window.location.origin}/claim/${data.claim_code}`
        setClaimLink(url)
      }
      setLoading(false)
    }
    fetchItem()
  }, [id])

  const handleCopy = async () => {
    if (!claimLink) return
    try {
      await navigator.clipboard.writeText(claimLink)
      setCopyLabel("Copied!")
      setTimeout(() => setCopyLabel("Copy link"), 1500)
    } catch {
      toast.error("Could not copy link")
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Loading…</p>
  }

  if (!item) {
    return <p className="text-sm text-slate-400">Item not found.</p>
  }

  return (
    <div className="mx-auto grid max-w-3xl items-start gap-6 md:grid-cols-[2fr,1fr]">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-50">{item.title}</h2>
          <StatusBadge status={item.status} />
        </div>
        <p className="whitespace-pre-wrap text-sm text-slate-300">
          {item.description || "No additional description provided."}
        </p>
        {item.location && (
          <p className="text-xs text-slate-400">
            <span className="text-slate-500">Last seen at:</span> {item.location}
          </p>
        )}
        <p className="text-[11px] text-slate-500">
          Created on {new Date(item.created_at).toLocaleString()}
        </p>
        {item.image_url && (
          <div className="mt-2">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full max-h-64 rounded-2xl border border-slate-800 object-cover"
            />
          </div>
        )}
      </div>
      <aside className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <h3 className="text-sm font-semibold text-slate-50">Claim via QR</h3>
        <p className="text-[11px] text-slate-400">
          Share this QR code with the potential owner. They can scan it to open a secure claim page
          and submit their details.
        </p>
        <div className="flex items-center justify-center py-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
            <QRCodeCanvas value={claimLink} size={148} bgColor="#020617" fgColor="#e5e7eb" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] text-slate-400">Claim link</p>
          <div className="flex items-center gap-2">
            <div className="break-all rounded-xl border border-slate-800 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-300">
              {claimLink}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-slate-700 px-2 py-1 text-[11px] text-slate-100 hover:border-primary-500 hover:text-primary-200"
            >
              {copyLabel}
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ItemDetails
