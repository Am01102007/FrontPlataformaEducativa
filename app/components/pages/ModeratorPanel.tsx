"use client"

import { useState } from "react"
import { Users, FileText, BarChart3, Trash2, Edit, Eye, Download } from "lucide-react"

export function ModeratorPanel() {
  const [activeTab, setActiveTab] = useState("users")

  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@email.com", role: "estudiante", joinDate: "2024-01-15" },
    { id: 2, name: "María González", email: "maria@email.com", role: "estudiante", joinDate: "2024-01-20" },
    { id: 3, name: "Carlos Admin", email: "carlos@email.com", role: "moderador", joinDate: "2024-01-10" },
  ]

  const content = [
    {
      id: 1,
      title: "Introducción a React",
      author: "María González",
      type: "Video",
      date: "2024-01-25",
      status: "Aprobado",
    },
    {
      id: 2,
      title: "Algoritmos de Ordenamiento",
      author: "Juan Pérez",
      type: "Documento",
      date: "2024-01-24",
      status: "Pendiente",
    },
    {
      id: 3,
      title: "Base de Datos SQL",
      author: "Ana López",
      type: "Presentación",
      date: "2024-01-23",
      status: "Aprobado",
    },
  ]

  const reports = [
    { id: "most-valued", title: "Contenidos Más Valorados", description: "Top 10 contenidos con mejor rating" },
    { id: "most-connected", title: "Estudiantes Más Conectados", description: "Usuarios con más conexiones" },
    { id: "shortest-paths", title: "Caminos Más Cortos", description: "Análisis de rutas de aprendizaje" },
    { id: "affinity-clusters", title: "Clústeres de Afinidad", description: "Grupos por intereses similares" },
    {
      id: "participation-levels",
      title: "Niveles de Participación",
      description: "Actividad de usuarios en la plataforma",
    },
  ]

  const generateReport = (reportId: string) => {
    alert(`Generando reporte: ${reports.find((r) => r.id === reportId)?.title}`)
  }

  const deleteUser = (userId: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      alert(`Usuario ${userId} eliminado`)
    }
  }

  const deleteContent = (contentId: number) => {
    if (confirm("¿Estás seguro de eliminar este contenido?")) {
      alert(`Contenido ${contentId} eliminado`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel del Moderador</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-[#4dd0e1] text-[#4dd0e1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="h-5 w-5 inline mr-2" />
              Gestión de Usuarios
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "content"
                  ? "border-[#4dd0e1] text-[#4dd0e1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="h-5 w-5 inline mr-2" />
              Gestión de Contenido
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "analytics"
                  ? "border-[#4dd0e1] text-[#4dd0e1]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <BarChart3 className="h-5 w-5 inline mr-2" />
              Análisis y Reportes
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestión de Usuarios</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de Registro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-[#4dd0e1] rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{user.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === "moderador"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-[#4dd0e1] hover:text-[#00acc1]">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestión de Contenido</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Autor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {content.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === "Aprobado"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-[#4dd0e1] hover:text-[#00acc1]">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button onClick={() => deleteContent(item.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Análisis y Reportes</h2>

              {/* Grafo de Afinidad */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Grafo de Afinidad</h3>
                <div className="bg-white rounded border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Visualización del grafo de afinidad</p>
                    <p className="text-sm text-gray-400">Aquí se mostraría el grafo interactivo</p>
                  </div>
                </div>
              </div>

              {/* Reportes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">{report.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <button
                      onClick={() => generateReport(report.id)}
                      className="w-full bg-[#4dd0e1] hover:bg-[#00acc1] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Generar Reporte</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
