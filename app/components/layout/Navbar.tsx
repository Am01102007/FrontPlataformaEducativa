"use client"

import { useState } from "react"
import { Home, User, Users, MessageCircle, Shield, LogOut, ChevronDown } from "lucide-react"

interface NavbarProps {
  user: any
  currentPage: string
  onPageChange: (page: string) => void
  onLogout: () => void
}

export function Navbar({ user, currentPage, onPageChange, onLogout }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const menuItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "estudiante", label: "Panel del Estudiante", icon: User },
    { id: "grupos", label: "Grupos", icon: Users },
    { id: "mensajes", label: "Mensajes", icon: MessageCircle },
    ...(user.role === "moderador" ? [{ id: "moderador", label: "Moderador", icon: Shield }] : []),
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-[#4dd0e1] to-[#00796b] rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">EduConnect</span>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? "bg-[#4dd0e1] text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#00796b]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="h-8 w-8 bg-[#4dd0e1] rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{user.fullName.charAt(0)}</span>
              </div>
              <span className="hidden md:block text-gray-700 font-medium">{user.fullName}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium text-gray-800">{user.fullName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-[#00796b] font-medium capitalize">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
