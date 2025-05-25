"use client"

import { useState } from "react"
import { Navbar } from "./Navbar"
import { HomePage } from "../pages/HomePage"
import { StudentPanel } from "../pages/StudentPanel"
import { StudyGroups } from "../pages/StudyGroups"
import { Messages } from "../pages/Messages"
import { ModeratorPanel } from "../pages/ModeratorPanel"

interface MainLayoutProps {
  user: any
  onLogout: () => void
}

export function MainLayout({ user, onLogout }: MainLayoutProps) {
  const [currentPage, setCurrentPage] = useState("inicio")

  const renderPage = () => {
    switch (currentPage) {
      case "inicio":
        return <HomePage />
      case "estudiante":
        return <StudentPanel user={user} />
      case "grupos":
        return <StudyGroups />
      case "mensajes":
        return <Messages />
      case "moderador":
        return user.role === "moderador" ? <ModeratorPanel /> : <HomePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-[#f0fdfc]">
      <Navbar user={user} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} />
      <main className="pt-16">{renderPage()}</main>
    </div>
  )
}
