"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"

interface LoginComponentProps {
  onSwitchToRegister: () => void
}

export function LoginComponent({ onSwitchToRegister }: LoginComponentProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "El correo es obligatorio"
        if (!/\S+@\S+\.\S+/.test(value)) return "Ingresa un correo válido"
        return ""
      case "password":
        if (!value) return "La contraseña es obligatoria"
        if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres"
        return ""
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar todos los campos
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    setTouched({ email: true, password: true })

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // Simular llamada a la API
      setTimeout(() => {
        setIsLoading(false)
        alert("¡Login exitoso! Redirigiendo al dashboard...")
      }, 1500)
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1] transition duration-200 ${
                errors.email && touched.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`pl-10 pr-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1] transition duration-200 ${
                errors.password && touched.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          {errors.password && touched.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex justify-center items-center"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Iniciar Sesión"}
        </button>

        {/* Enlace a registro */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <button type="button" onClick={onSwitchToRegister} className="text-[#00796b] hover:underline font-medium">
              Regístrate
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
