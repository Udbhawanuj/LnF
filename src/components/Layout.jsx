import { NavLink } from "react-router-dom"

const navLinks = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/report", label: "Report item" },
  { to: "/app/browse", label: "Browse items" }
]

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-slate-900 text-zinc-50">
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-500 text-sm font-semibold tracking-tight text-white shadow-lg shadow-primary-500/40">
              LF
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-semibold tracking-tight">
                Lost &amp; Found
              </h1>
              <p className="text-xs text-neutral-400">
                Managed by Udbhaw Anuj
              </p>
            </div>
          </div>

          <nav className="hidden gap-2 text-sm font-medium sm:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/app"}
                className={({ isActive }) =>
                  [
                    "rounded-full px-3 py-1.5 transition",
                    isActive
                      ? "bg-primary-500 text-white shadow-md shadow-primary-500/40"
                      : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-1 flex-col px-4 py-6">
        {children}
      </main>
    </div>
  )
}
