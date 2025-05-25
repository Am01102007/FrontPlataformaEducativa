"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, ImageIcon, AlertCircle, Users, Star } from "lucide-react"

interface StudentPanelProps {
  user: any
}

export function StudentPanel({ user }: StudentPanelProps) {
  const [contentForm, setContentForm] = useState({
    title: "",
    type: "documento",
    link: "",
    description: "",
  })

  const [helpForm, setHelpForm] = useState({
    topic: "",
    priority: "media",
    description: "",
  })

  const myContent = [
    { id: 1, title: "Guía de JavaScript", type: "Documento", rating: 4.5, views: 120 },
    { id: 2, title: "Tutorial de CSS Grid", type: "Video", rating: 4.8, views: 89 },
  ]

  const suggestedPeers = [
    { id: 1, name: "Ana García", interests: ["React", "Node.js"], avatar: "AG" },
    { id: 2, name: "Luis Martín", interests: ["Python", "ML"], avatar: "LM" },
    { id: 3, name: "Sofia Chen", interests: ["Design", "UX"], avatar: "SC" },
  ]

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Contenido publicado exitosamente!")
    setContentForm({ title: "", type: "documento", link: "", description: "" })
  }

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Solicitud de ayuda enviada!")
    setHelpForm({ topic: "", priority: "media", description: "" })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel del Estudiante</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Publicar Contenido */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2 text-[#4dd0e1]" />
            Publicar Contenido
          </h2>

          <form onSubmit={handleContentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={contentForm.title}
                onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="Título del contenido"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={contentForm.type}
                onChange={(e) => setContentForm({ ...contentForm, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              >
                <option value="documento">Documento</option>
                <option value="video">Video</option>
                <option value="presentacion">Presentación</option>
                <option value="imagen">Imagen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enlace/Archivo</label>
              <input
                type="url"
                value={contentForm.link}
                onChange={(e) => setContentForm({ ...contentForm, link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={contentForm.description}
                onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="Describe tu contenido..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Publicar Contenido
            </button>
          </form>
        </div>

        {/* Solicitar Ayuda */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-[#4dd0e1]" />
            Solicitar Ayuda Académica
          </h2>

          <form onSubmit={handleHelpSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
              <input
                type="text"
                value={helpForm.topic}
                onChange={(e) => setHelpForm({ ...helpForm, topic: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="¿En qué necesitas ayuda?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
              <select
                value={helpForm.priority}
                onChange={(e) => setHelpForm({ ...helpForm, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={helpForm.description}
                onChange={(e) => setHelpForm({ ...helpForm, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="Describe tu problema o duda..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00796b] hover:bg-[#004d40] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>

      {/* Mi Contenido */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mi Contenido</h2>
        <div className="space-y-3">
          {myContent.map((content) => (
            <div key={content.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                {content.type === "Imagen" ? (
                  <ImageIcon className="h-5 w-5 text-[#4dd0e1]" />
                ) : (
                  <FileText className="h-5 w-5 text-[#4dd0e1]" />
                )}
                <div>
                  <h3 className="font-medium text-gray-800">{content.title}</h3>
                  <p className="text-sm text-gray-600">{content.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{content.rating}</span>
                </div>
                <span className="text-sm text-gray-500">{content.views} vistas</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compañeros Sugeridos */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-[#4dd0e1]" />
          Compañeros Sugeridos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedPeers.map((peer) => (
            <div key={peer.id} className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="h-12 w-12 bg-[#4dd0e1] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-medium">{peer.avatar}</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">{peer.name}</h3>
              <div className="flex flex-wrap justify-center gap-1 mb-3">
                {peer.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {interest}
                  </span>
                ))}
              </div>
              <button className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] text-white text-sm py-2 px-3 rounded transition-colors">
                Conectar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
