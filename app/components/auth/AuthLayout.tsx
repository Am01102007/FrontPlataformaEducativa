"use client"

import { useState } from "react"
import { LoginComponent } from "./LoginComponent"
import { RegisterComponent } from "./RegisterComponent"

interface AuthLayoutProps {
  onLogin: (userData: any) => void
}

export function AuthLayout({ onLogin }: AuthLayoutProps) {
  const [currentView, setCurrentView] = useState<"login" | "register">("login")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4dd0e1] to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8 pt-8">
          <div className="bg-white p-4 rounded-full shadow-md">
            <div className="h-16 w-16 bg-gradient-to-br from-[#4dd0e1] to-[#00796b] rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Red Social de Aprendizaje Colaborativo</h1>
          <p className="text-white/80">Conecta, aprende y colabora</p>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setCurrentView("login")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                currentView === "login" ? "bg-[#4dd0e1] text-white" : "text-gray-600 hover:text-[#00796b]"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setCurrentView("register")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                currentView === "register" ? "bg-[#4dd0e1] text-white" : "text-gray-600 hover:text-[#00796b]"
              }`}
            >
              Registrarse
            </button>
          </div>

          {currentView === "login" ? (
            <LoginComponent onLogin={onLogin} onSwitchToRegister={() => setCurrentView("register")} />
          ) : (
            <RegisterComponent onSwitchToLogin={() => setCurrentView("login")} />
          )}
        </div>

        <div className="text-center mt-8 text-white/70 text-sm">
          <p>© 2024 Red Social de Aprendizaje Colaborativo</p>
          <p>Desarrollado con Angular + Spring Boot</p>
        </div>
      </div>
    </div>
  )
}
