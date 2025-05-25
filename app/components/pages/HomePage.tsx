"use client"

import { useState } from "react"
import { Search, Star, Download, Plus, Users } from "lucide-react"

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const featuredContent = [
    {
      id: 1,
      title: "Introducción a React",
      author: "María González",
      type: "Video",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Algoritmos de Ordenamiento",
      author: "Carlos Ruiz",
      type: "Documento",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Base de Datos Relacionales",
      author: "Ana López",
      type: "Presentación",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Machine Learning Básico",
      author: "Pedro Martín",
      type: "Video",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const loadTestData = () => {
    alert("Datos de prueba cargados exitosamente!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a EduConnect</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre contenido educativo de calidad, conecta con otros estudiantes y colabora en tu aprendizaje.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por tema, tipo o autor..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
          />
        </div>
      </div>

      {/* Featured Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contenido Más Valorado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredContent.map((content) => (
            <div
              key={content.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img src={content.image || "/placeholder.svg"} alt={content.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{content.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Por {content.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-[#4dd0e1] text-white px-2 py-1 rounded">{content.type}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{content.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="h-12 w-12 bg-[#4dd0e1] rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Publicar Contenido</h3>
          <p className="text-gray-600 text-sm">Comparte tus conocimientos con la comunidad</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="h-12 w-12 bg-[#00796b] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Unirse a Grupos</h3>
          <p className="text-gray-600 text-sm">Encuentra grupos de estudio afines a tus intereses</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="h-12 w-12 bg-[#4dd0e1] rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Descargar Recursos</h3>
          <p className="text-gray-600 text-sm">Accede a materiales educativos de calidad</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={loadTestData}
        className="fixed bottom-6 right-6 bg-[#4dd0e1] hover:bg-[#00acc1] text-white p-4 rounded-full shadow-lg transition-colors"
        title="Cargar datos de prueba"
      >
        <Download className="h-6 w-6" />
      </button>
    </div>
  )
}
