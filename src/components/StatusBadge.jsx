import React from "react"
import classNames from "classnames"

function StatusBadge({ status }) {
  const normalized = (status || "").toLowerCase()

  let label = "Status"
  let style = "bg-slate-500/10 text-slate-300 border-slate-500/40"

  if (normalized === "found") {
    label = "Found"
    style = "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
  } else if (normalized === "lost") {
    label = "Lost"
    style = "bg-rose-500/10 text-rose-300 border-rose-500/40"
  }

  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-tight",
        style
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

export default StatusBadge
