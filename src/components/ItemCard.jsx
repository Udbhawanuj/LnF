import React from "react"
import { Link } from "react-router-dom"
import StatusBadge from "./StatusBadge"

function ItemCard({ item }) {
  const createdAtLabel = item?.created_at
    ? new Date(item.created_at).toLocaleDateString()
    : "Date not set"

  const description =
    item?.description?.trim() ||
    "No description added. Click to view more details or claim information."

  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-lg shadow-black/40 transition hover:border-primary-500/70 hover:bg-slate-900/90">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-1 text-sm font-semibold text-slate-50">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-400">
            {description}
          </p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      {item.location && (
        <p className="text-[11px] text-slate-400">
          <span className="text-slate-500">Last seen at:</span> {item.location}
        </p>
      )}

      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
        <span>{createdAtLabel}</span>
        <Link
          to={`/app/items/${item.id}`}
          className="font-medium text-primary-300 transition group-hover:text-primary-200"
        >
          View details →
        </Link>
      </div>
    </article>
  )
}

export default ItemCard
