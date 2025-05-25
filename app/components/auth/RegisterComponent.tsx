"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle } from "lucide-react"

interface RegisterComponentProps {
  onSwitchToLogin: () => void
}

export function RegisterComponent({ onSwitchToLogin }: RegisterComponentProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("¡Registro exitoso! Redirigiendo al inicio de sesión...")
      setTimeout(() => {
        onSwitchToLogin()
      }, 2000)
    }, 1500)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              placeholder="Juan Pérez"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{successMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex justify-center items-center"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Registrarse"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-[#00796b] hover:underline font-medium">
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
