import { useState } from "react"
import { useNavigate } from "react-router-dom"

const categories = ["Electronics", "Bag", "Wallet", "ID Card", "Keys", "Clothing", "Other"]

export default function ReportItem({ onReport }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    status: "lost",
    date: "",
    description: "",
    contactName: "",
    contactEmail: ""
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title || !form.location || !form.date || !form.contactName || !form.contactEmail) {
      setError("Please fill in all required fields marked with *.")
      return
    }

    onReport(form)
    navigate("/app/browse")

  }

  const inputBase =
    "w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/80"

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-neutral-800/80 bg-neutral-950/70 p-5 shadow-xl shadow-black/50">
      <h2 className="text-lg font-semibold tracking-tight">
        Report lost or found item
      </h2>
      <p className="mt-1 text-xs text-neutral-400">
        Add clear details so others can quickly identify and contact the right person.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs text-neutral-300" htmlFor="title">
            Item title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Black backpack with laptop"
            className={inputBase}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-neutral-300" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputBase}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-300" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputBase}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-neutral-300" htmlFor="location">
            Location <span className="text-red-400">*</span>
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Where was it lost or found?"
            className={inputBase}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-neutral-300" htmlFor="date">
            Date <span className="text-red-400">*</span>
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-neutral-300" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Add helpful details, unique marks, identifiers, etc."
            className={inputBase + " min-h-[90px] resize-y"}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-neutral-300" htmlFor="contactName">
              Your name <span className="text-red-400">*</span>
            </label>
            <input
              id="contactName"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputBase}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-300" htmlFor="contactEmail">
              Contact email <span className="text-red-400">*</span>
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputBase}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary mt-2 w-full">
          Submit report
        </button>
      </form>
    </div>
  )
}
