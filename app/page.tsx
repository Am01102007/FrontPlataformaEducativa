"use client"

import { useState } from "react"
import { AuthLayout } from "./components/auth/AuthLayout"
import { MainLayout } from "./components/layout/MainLayout"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const handleLogin = (userData: any) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AuthLayout onLogin={handleLogin} />
  }

  return <MainLayout user={currentUser} onLogout={handleLogout} />
}
