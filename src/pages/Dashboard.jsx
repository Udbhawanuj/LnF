export default function Dashboard({ items }) {
  const total = items.length
  const lost = items.filter((i) => i.status === "lost").length
  const found = items.filter((i) => i.status === "found").length

  const latest = [...items]
    .sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
    .slice(0, 4)

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Lost &amp; Found overview
          </h2>
          <p className="text-sm text-neutral-400">
            Track reports in one place and help belongings reach back to their owners.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-neutral-900/60 p-4 shadow-lg shadow-black/40">
          <p className="text-xs text-neutral-400">Total records</p>
          <p className="mt-1 text-2xl font-semibold">{total}</p>
          <p className="mt-1 text-[11px] text-neutral-500">
            All lost and found items currently tracked.
          </p>
        </div>
        <div className="rounded-2xl bg-neutral-900/60 p-4 shadow-lg shadow-black/40">
          <p className="text-xs text-neutral-400">Lost items</p>
          <p className="mt-1 text-2xl font-semibold text-amber-300">{lost}</p>
          <p className="mt-1 text-[11px] text-neutral-500">
            Items that are still reported missing.
          </p>
        </div>
        <div className="rounded-2xl bg-neutral-900/60 p-4 shadow-lg shadow-black/40">
          <p className="text-xs text-neutral-400">Found items</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-300">{found}</p>
          <p className="mt-1 text-[11px] text-neutral-500">
            Items that have been reported as found on campus.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight">
            Recent activity
          </h3>
          <p className="text-xs text-neutral-400">
            Latest lost and found reports.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {latest.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{item.title}</h4>
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
              <p className="mt-1 text-xs text-neutral-400">
                {item.location || "Location not specified"}
              </p>
              {item.description && (
                <p className="mt-2 line-clamp-2 text-xs text-neutral-300">
                  {item.description}
                </p>
              )}
              <p className="mt-2 text-[11px] text-neutral-500">
                Reported by {item.contactName || "Unknown"}{" "}
                {item.date && <>on {item.date}</>}
              </p>
            </article>
          ))}
          {latest.length === 0 && (
            <p className="text-sm text-neutral-400">
              No items yet. Start by reporting a lost or found item.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
