import React, { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

import { supabase } from "./lib/supabaseClient"
import { SessionProvider, useSession } from "./context/SessionContext"

import Navbar from "./components/Navbar"
import Layout from "./components/Layout"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import BrowseItems from "./pages/BrowseItems"
import ReportItem from "./pages/ReportItem"
import ItemDetails from "./pages/ItemDetails"
import ClaimPage from "./pages/ClaimPage"

// Simple full-page loader for auth / data loading
function FullPageLoader({ label = "Loading…" }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  )
}

// Guard for routes that require authentication
function RequireAuth({ children }) {
  const { session, loading } = useSession()
  const location = useLocation()

  if (loading) {
    return <FullPageLoader label="Preparing your dashboard…" />
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

// Core app content (inside SessionProvider + BrowserRouter)
function AppContent() {
  const [items, setItems] = useState([])
  const [itemsLoading, setItemsLoading] = useState(true)
  const [itemsError, setItemsError] = useState(null)

  // Fetch items once and on refresh
  useEffect(() => {
    const fetchItems = async () => {
      setItemsLoading(true)
      setItemsError(null)
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error(error)
        setItemsError("Could not load items.")
        toast.error("Could not load items")
      } else {
        setItems(data || [])
      }
      setItemsLoading(false)
    }

    fetchItems()
  }, [])

  // Handle new report from ReportItem page
  const handleReport = async (payload) => {
    const { data, error } = await supabase
      .from("items")
      .insert([{ ...payload }])
      .select()
      .single()

    if (error) {
      console.error(error)
      toast.error("Failed to create report")
      return
    }

    toast.success("Item reported")
    setItems((prev) => [data, ...prev])
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginRedirectIfAuthed />} />
        <Route path="/register" element={<RegisterRedirectIfAuthed />} />
        <Route path="/claim/:claimCode" element={<ClaimPage />} />

        {/* Protected app routes */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Layout>
                {itemsLoading ? (
                  <p className="text-sm text-slate-400">Loading items…</p>
                ) : itemsError ? (
                  <p className="text-sm text-rose-400">{itemsError}</p>
                ) : (
                  <Dashboard items={items} />
                )}
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/browse"
          element={
            <RequireAuth>
              <Layout>
                {itemsLoading ? (
                  <p className="text-sm text-slate-400">Loading items…</p>
                ) : itemsError ? (
                  <p className="text-sm text-rose-400">{itemsError}</p>
                ) : (
                  <BrowseItems items={items} />
                )}
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/report"
          element={
            <RequireAuth>
              <Layout>
                <ReportItem onReport={handleReport} />
              </Layout>
            </RequireAuth>
          }
        />

        <Route
          path="/app/items/:id"
          element={
            <RequireAuth>
              <Layout>
                <ItemDetails />
              </Layout>
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

// If already logged in and goes to /login -> redirect to /app
function LoginRedirectIfAuthed() {
  const { session, loading } = useSession()

  if (loading) return <FullPageLoader label="Checking your session…" />
  if (session) return <Navigate to="/app" replace />

  return <Login />
}

function RegisterRedirectIfAuthed() {
  const { session, loading } = useSession()

  if (loading) return <FullPageLoader label="Checking your session…" />
  if (session) return <Navigate to="/app" replace />

  return <Register />
}

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster position="top-right" />
      </BrowserRouter>
    </SessionProvider>
  )
}
