"use client"

import type React from "react"

import { useState } from "react"
import { Send, Search, MoreVertical } from "lucide-react"

export function Messages() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const contacts = [
    { id: 1, name: "María González", lastMessage: "¿Tienes el material de React?", time: "10:30", unread: 2 },
    { id: 2, name: "Carlos Ruiz", lastMessage: "Perfecto, nos vemos mañana", time: "09:15", unread: 0 },
    { id: 3, name: "Ana López", lastMessage: "Gracias por la ayuda!", time: "Ayer", unread: 1 },
    { id: 4, name: "Pedro Martín", lastMessage: "¿Podemos revisar el código?", time: "Ayer", unread: 0 },
  ]

  const messages = [
    { id: 1, sender: "María González", content: "Hola! ¿Cómo estás?", time: "10:25", isMe: false },
    { id: 2, sender: "Yo", content: "¡Hola María! Todo bien, ¿y tú?", time: "10:26", isMe: true },
    {
      id: 3,
      sender: "María González",
      content: "Muy bien, gracias. ¿Tienes el material de React que mencionaste?",
      time: "10:28",
      isMe: false,
    },
    { id: 4, sender: "Yo", content: "Sí, claro. Te lo envío ahora mismo", time: "10:29", isMe: true },
    { id: 5, sender: "María González", content: "¿Tienes el material de React?", time: "10:30", isMe: false },
  ]

  const sendMessage = () => {
    if (newMessage.trim()) {
      alert(`Mensaje enviado: ${newMessage}`)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mensajes</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: "600px" }}>
        <div className="flex h-full">
          {/* Contacts Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar contactos..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1] text-sm"
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedChat(contact.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === contact.id ? "bg-[#4dd0e1]/10 border-l-4 border-l-[#4dd0e1]" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-[#4dd0e1] rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{contact.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800 truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                        {contact.unread > 0 && (
                          <span className="bg-[#4dd0e1] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-[#4dd0e1] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {contacts.find((c) => c.id === selectedChat)?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{contacts.find((c) => c.id === selectedChat)?.name}</h3>
                  <p className="text-sm text-green-500">En línea</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isMe ? "bg-[#4dd0e1] text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isMe ? "text-white/70" : "text-gray-500"}`}>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4dd0e1] focus:border-[#4dd0e1]"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#4dd0e1] hover:bg-[#00acc1] text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
