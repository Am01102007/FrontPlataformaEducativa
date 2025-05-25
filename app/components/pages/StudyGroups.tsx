"use client"

import { useState } from "react"
import { Users, Search, Filter, UserPlus } from "lucide-react"

export function StudyGroups() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("todos")

  const studyGroups = [
    {
      id: 1,
      name: "React Avanzado",
      topic: "Frontend",
      members: 12,
      maxMembers: 15,
      description: "Grupo para estudiar conceptos avanzados de React y hooks",
      avatars: ["JD", "AM", "LC"],
    },
    {
      id: 2,
      name: "Machine Learning",
      topic: "IA",
      members: 8,
      maxMembers: 10,
      description: "Exploramos algoritmos de ML y sus aplicaciones prácticas",
      avatars: ["PG", "SM", "RH"],
    },
    {
      id: 3,
      name: "Diseño UX/UI",
      topic: "Diseño",
      members: 15,
      maxMembers: 20,
      description: "Principios de diseño centrado en el usuario",
      avatars: ["MR", "AL", "CF"],
    },
    {
      id: 4,
      name: "Python para Data Science",
      topic: "Backend",
      members: 10,
      maxMembers: 12,
      description: "Análisis de datos y visualización con Python",
      avatars: ["DL", "NK", "TS"],
    },
  ]

  const topics = ["todos", "Frontend", "Backend", "IA", "Diseño", "Móvil"]

  const filteredGroups = studyGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "todos" || group.topic === selectedFilter
    return matchesSearch && matchesFilter
  })

  const joinGroup = (groupId: number) => {
    alert(`Te has unido al grupo ${groupId}!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Grupos de Estudio</h1>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar grupos por nombre o descripción..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1] appearance-none bg-white"
            >
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic === "todos" ? "Todos los temas" : topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
                <span className="text-xs bg-[#4dd0e1] text-white px-2 py-1 rounded">{group.topic}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{group.description}</p>

              {/* Members */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {group.members}/{group.maxMembers} miembros
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {group.avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 bg-[#4dd0e1] rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <span className="text-white text-xs font-medium">{avatar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#4dd0e1] h-2 rounded-full"
                    style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                  />
                </div>
              </div>

              {/* Join Button */}
              <button
                onClick={() => joinGroup(group.id)}
                disabled={group.members >= group.maxMembers}
                className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                  group.members >= group.maxMembers
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#4dd0e1] hover:bg-[#00acc1] text-white"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span>{group.members >= group.maxMembers ? "Grupo lleno" : "Unirse al grupo"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No se encontraron grupos</h3>
          <p className="text-gray-500">Intenta con otros términos de búsqueda o filtros</p>
        </div>
      )}
    </div>
  )
}
