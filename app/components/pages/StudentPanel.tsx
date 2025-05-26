"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, FileText, ImageIcon, AlertCircle, Users, Star } from "lucide-react"
import ContentService, { CreateContentData, ContentType } from "@/services/contentService"
import HelpRequestService, { CreateHelpRequestData, HelpRequestPriority } from "@/services/helpRequestService"
import StudentService from "@/services/studentService"

interface StudentPanelProps {
  user: any
}

export function StudentPanel({ user }: StudentPanelProps) {
  const [contentForm, setContentForm] = useState<CreateContentData>({
    title: "",
    contentType: "DOCUMENT",
    contentUrl: "",
    description: "",
    tags: []
  })

  const [helpForm, setHelpForm] = useState<CreateHelpRequestData>({
    title: "",
    topic: "",
    priority: "MEDIUM",
    description: ""
  })

  const [myContent, setMyContent] = useState<any[]>([])
  const [suggestedPeers, setSuggestedPeers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadMyContent()
    loadSuggestedPeers()
  }, [user])

  const loadMyContent = async () => {
    try {
      if (user?.id) {
        const response = await ContentService.getContentsByAuthor(user.id, 0, 10)
        setMyContent(response.content)
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  const loadSuggestedPeers = async () => {
    try {
      if (user?.id) {
        const recommendations = await StudentService.getStudentRecommendations(user.id)
        // Convertir el Map<UUID, Integer> a array de estudiantes recomendados
        const peers = Object.entries(recommendations).slice(0, 3).map(([id, score]) => ({
          id,
          name: `Usuario ${id.slice(0, 8)}`, // Temporal
          interests: ["React", "Node.js"], // Temporal
          avatar: id.slice(0, 2).toUpperCase(),
          score
        }))
        setSuggestedPeers(peers)
      }
    } catch (error) {
      console.error('Error loading suggestions:', error)
    }
  }

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const tagsArray = typeof contentForm.tags === 'string' 
        ? contentForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : contentForm.tags

      const contentData: CreateContentData = {
        ...contentForm,
        tags: tagsArray
      }

      await ContentService.createContent(contentData)
      
      // Resetear formulario
      setContentForm({
        title: "",
        contentType: "DOCUMENT",
        contentUrl: "",
        description: "",
        tags: []
      })
      
      // Recargar contenido
      await loadMyContent()
      alert("Contenido publicado exitosamente!")
    } catch (error) {
      setErrors({ content: error instanceof Error ? error.message : 'Error al publicar contenido' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleHelpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      await HelpRequestService.createHelpRequest(helpForm)
      
      // Resetear formulario
      setHelpForm({
        title: "",
        topic: "",
        priority: "MEDIUM",
        description: ""
      })
      
      alert("Solicitud de ayuda enviada exitosamente!")
    } catch (error) {
      setErrors({ help: error instanceof Error ? error.message : 'Error al enviar solicitud' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    setContentForm({ ...contentForm, tags: tagsArray })
  }

  const getPriorityColor = (priority: HelpRequestPriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      case "URGENT":
        return "bg-purple-100 text-purple-800"
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
                value={contentForm.contentType}
                onChange={(e) => setContentForm({ ...contentForm, contentType: e.target.value as ContentType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              >
                <option value="DOCUMENT">Documento</option>
                <option value="VIDEO">Video</option>
                <option value="LINK">Enlace</option>
                <option value="IMAGE">Imagen</option>
                <option value="CODE">Código</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL del Contenido</label>
              <input
                type="url"
                value={contentForm.contentUrl || ""}
                onChange={(e) => setContentForm({ ...contentForm, contentUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas (separadas por comas)</label>
              <input
                type="text"
                value={Array.isArray(contentForm.tags) ? contentForm.tags.join(', ') : contentForm.tags}
                onChange={handleTagsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="javascript, react, tutorial"
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

            {errors.content && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.content}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? "Publicando..." : "Publicar Contenido"}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={helpForm.title}
                onChange={(e) => setHelpForm({ ...helpForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="¿En qué necesitas ayuda?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
              <input
                type="text"
                value={helpForm.topic}
                onChange={(e) => setHelpForm({ ...helpForm, topic: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                placeholder="Matemáticas, Programación, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
              <select
                value={helpForm.priority}
                onChange={(e) => setHelpForm({ ...helpForm, priority: e.target.value as HelpRequestPriority })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
              >
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
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

            {errors.help && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.help}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00796b] hover:bg-[#004d40] disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? "Enviando..." : "Enviar Solicitud"}
            </button>
          </form>
        </div>
      </div>

      {/* Mi Contenido */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mi Contenido</h2>
        <div className="space-y-3">
          {myContent.length > 0 ? (
            myContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {content.contentType === "IMAGE" ? (
                    <ImageIcon className="h-5 w-5 text-[#4dd0e1]" />
                  ) : (
                    <FileText className="h-5 w-5 text-[#4dd0e1]" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">{content.title}</h3>
                    <p className="text-sm text-gray-600">{content.contentType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{content.averageRating?.toFixed(1) || "0.0"}</span>
                  </div>
                  <span className="text-sm text-gray-500">{content.viewCount || 0} vistas</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No has publicado contenido aún</p>
          )}
        </div>
      </div>

      {/* Compañeros Sugeridos */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-[#4dd0e1]" />
          Compañeros Sugeridos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedPeers.length > 0 ? (
            suggestedPeers.map((peer) => (
              <div key={peer.id} className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="h-12 w-12 bg-[#4dd0e1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-medium">{peer.avatar}</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">{peer.name}</h3>
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {peer.interests.map((interest: string, index: number) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {interest}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] text-white text-sm py-2 px-3 rounded transition-colors">
                  Conectar
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No hay sugerencias disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}