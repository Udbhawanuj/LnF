import { useMemo, useState } from "react"

export default function BrowseItems({ items }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (statusFilter === "all") return true
        return item.status === statusFilter
      })
      .filter((item) => {
        if (!search.trim()) return true
        const query = search.toLowerCase()
        return (
          item.title?.toLowerCase().includes(query) ||
          item.location?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query)
        )
      })
  }, [items, search, statusFilter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Browse lost and found items
          </h2>
          <p className="text-xs text-neutral-400">
            Filter by status or keywords and quickly scan through campus reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5">
            <span className="text-[11px] text-neutral-400">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-neutral-100 outline-none"
            >
              <option value="all">All</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1.5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, location, category…"
              className="w-48 bg-transparent text-xs text-neutral-100 placeholder:text-neutral-500 outline-none sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="flex flex-col rounded-2xl border border-neutral-800/80 bg-neutral-950/80 p-4 shadow-lg shadow-black/40"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-0.5 text-[11px] text-neutral-400">
                  {item.category || "General"} • {item.location || "Location not specified"}
                </p>
              </div>
              <span
                className={
                  "rounded-full px-2 py-0.5 text-[11px] font-medium " +
                  (item.status === "lost"
                    ? "bg-amber-500/15 text-amber-300"
                    : "bg-emerald-500/15 text-emerald-300")
                }
              >
                {item.status === "lost" ? "Lost" : "Found"}
              </span>
            </div>

            {item.description && (
              <p className="mt-2 line-clamp-3 text-xs text-neutral-300">
                {item.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
              <span>
                Reported by {item.contactName || "Unknown"} • {item.date || "Date not set"}
              </span>
              {item.contactEmail && <span>{item.contactEmail}</span>}
            </div>
          </article>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-6 text-center">
            <p className="text-sm font-medium text-neutral-200">
              No matching items
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Try adjusting your filters or search query, or create a new report.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
