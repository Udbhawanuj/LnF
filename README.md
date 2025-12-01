# Lost & Found – React + Supabase

A modern Lost & Found web application built with **React + Vite + Tailwind CSS** on the frontend and **Supabase (PostgreSQL, Auth, Storage, Edge Functions)** as the backend-as-a-service.

> Designed and customised for portfolio use by **Udbhaw Anuj**.

## ✨ Features

- Role-based authentication using **Supabase Auth**
- Create, list and filter **lost / found** items
- **Advanced search & filtering** by status and title
- **Photo upload** for each item using Supabase Storage
- **QR-based claim verification** – share QR with potential owners
- **Claim submission flow** with optional **email notification** via Supabase Edge Functions
- Fully responsive, dark, modern UI

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, React Router, Tailwind CSS
- **Backend & Infra:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Other:** qrcode.react, nanoid

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

In Supabase SQL editor, run the SQL from:

- `supabase/schema.sql`
- `supabase/policies.sql`

Also create a **Storage bucket** named `item-images` and make it public.

### 3. Run locally

```bash
npm run dev
```

Open the app at the URL printed in your terminal (usually `http://localhost:5173`).

## 📦 Deploy

- **Frontend:** Deploy this Vite app to **Vercel** or **Netlify**.
- **Backend:** Supabase is already hosted; just point the env vars in Vercel to your Supabase project.

## 🧑‍💻 Credit

Crafted with care by **Udbhaw Anuj** as a professional Lost & Found portfolio project.
