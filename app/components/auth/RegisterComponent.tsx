"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle } from "lucide-react"
import AuthService, { RegisterData } from "@/services/authService"

interface RegisterComponentProps {
  onSwitchToLogin: () => void
  onLogin?: (userData: any) => void // Agregar esta prop opcional
}

export function RegisterComponent({ onSwitchToLogin, onLogin }: RegisterComponentProps) {
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "STUDENT", // Por defecto estudiante
    academicInterests: [],
    fieldOfStudy: "",
    educationLevel: "",
    bio: ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validar contraseñas
    if (formData.password !== confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" })
      setIsLoading(false)
      return
    }

    try {
      const response = await AuthService.register(formData)
      
      // Si el registro es exitoso y devuelve un token, iniciar sesión automáticamente
      if (response.token && onLogin) {
        // Crear objeto de usuario compatible
        const userData = {
          id: "temp-id", // Se obtendrá después
          fullName: formData.fullName,
          email: formData.email,
          role: response.role === 'STUDENT' ? 'estudiante' : 'moderador',
          username: response.username
        }
        
        setSuccessMessage("¡Registro exitoso! Iniciando sesión...")
        
        // Esperar un momento antes de iniciar sesión
        setTimeout(() => {
          onLogin(userData)
        }, 1500)
      } else {
        // Si no hay función onLogin, mostrar mensaje y cambiar a login
        setSuccessMessage("¡Registro exitoso! Redirigiendo al inicio de sesión...")
        
        setTimeout(() => {
          onSwitchToLogin()
        }, 2000)
      }
    } catch (error) {
      setErrors({ 
        general: error instanceof Error ? error.message : 'Error en el registro' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              placeholder="tu_usuario"
              required
            />
          </div>
        </div>

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
          <label className="block text-sm font-medium text-gray-700">Campo de estudio</label>
          <input
            type="text"
            value={formData.fieldOfStudy || ""}
            onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
            placeholder="Ingeniería de Sistemas"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Nivel educativo</label>
          <select
            value={formData.educationLevel || ""}
            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
            required
          >
            <option value="">Seleccionar nivel</option>
            <option value="Pregrado">Pregrado</option>
            <option value="Posgrado">Posgrado</option>
            <option value="Maestría">Maestría</option>
            <option value="Doctorado">Doctorado</option>
          </select>
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              placeholder="••••••••"
              required
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}

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