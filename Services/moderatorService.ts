// services/moderatorService.ts
import apiClient from '@/lib/api';
import { User } from '@/services/authService'; 

export interface Moderator extends User {
  department: string;
  specialization: string;
  accessLevel: number;
  contactInfo?: string;
}

export interface UpdateModeratorData {
  username?: string;
  email?: string;
  fullName?: string;
  department?: string;
  specialization?: string;
  accessLevel?: number;
  contactInfo?: string;
}

export interface ConnectionAnalytics {
  studentA: string;
  studentB: string;
  strength: number;
  commonInterests: string[];
  lastInteraction: string;
}

export interface PathAnalytics {
  path: any[];
  distance: number;
  found: boolean;
}

export interface StudentStats {
  id: string;
  username: string;
  fullName: string;
  connectionCount: number;
}

export interface Community {
  id: string;
  username: string;
  fullName: string;
}

export class ModeratorService {
  // Obtener todos los moderadores
  static async getAllModerators(): Promise<Moderator[]> {
    try {
      const response = await apiClient.get('/moderators');
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener moderadores');
    }
  }

  // Obtener moderador por ID
  static async getModeratorById(id: string): Promise<Moderator> {
    try {
      const response = await apiClient.get(`/moderators/${id}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener moderador');
    }
  }

  // Obtener moderador por username
  static async getModeratorByUsername(username: string): Promise<Moderator> {
    try {
      const response = await apiClient.get(`/moderators/username/${username}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener moderador');
    }
  }

  // Actualizar moderador
  static async updateModerator(id: string, moderatorData: UpdateModeratorData): Promise<Moderator> {
    try {
      const response = await apiClient.put(`/moderators/${id}`, moderatorData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al actualizar moderador');
    }
  }

  // Cambiar contraseña
  static async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<Moderator> {
    try {
      const response = await apiClient.put(`/moderators/${id}/password`, {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al cambiar contraseña');
    }
  }

  // Buscar moderadores por departamento
  static async findModeratorsByDepartment(department: string): Promise<Moderator[]> {
    try {
      const response = await apiClient.get(`/moderators/department/${encodeURIComponent(department)}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar moderadores por departamento');
    }
  }

  // Buscar moderadores por especialización
  static async findModeratorsBySpecialization(specialization: string): Promise<Moderator[]> {
    try {
      const response = await apiClient.get(`/moderators/specialization/${encodeURIComponent(specialization)}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar moderadores por especialización');
    }
  }

  // Buscar moderadores por nivel de acceso mínimo
  static async findModeratorsByMinimumAccessLevel(level: number): Promise<Moderator[]> {
    try {
      const response = await apiClient.get(`/moderators/access-level/${level}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar moderadores por nivel de acceso');
    }
  }

  // Analytics - Obtener conexiones más fuertes
  static async getTopStudentConnections(limit: number = 10): Promise<any[]> {
    try {
      const response = await apiClient.get(`/moderators/analytics/top-connections?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener conexiones principales');
    }
  }

  // Analytics - Obtener camino más corto entre estudiantes
  static async getShortestPath(startId: string, endId: string): Promise<PathAnalytics> {
    try {
      const response = await apiClient.get(`/moderators/analytics/path?startId=${startId}&endId=${endId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener camino más corto');
    }
  }

  // Analytics - Obtener estadísticas de conexiones
  static async getStudentConnectionsStats(): Promise<any[]> {
    try {
      const response = await apiClient.get('/moderators/analytics/connection-stats');
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener estadísticas de conexiones');
    }
  }

  // Analytics - Obtener estudiantes más conectados
  static async getMostConnectedStudents(limit: number = 10): Promise<StudentStats[]> {
    try {
      const response = await apiClient.get(`/moderators/analytics/most-connected?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener estudiantes más conectados');
    }
  }

  // Analytics - Detectar comunidades
  static async detectCommunities(): Promise<Community[][]> {
    try {
      const response = await apiClient.get('/moderators/analytics/communities');
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al detectar comunidades');
    }
  }

  // Analytics - Generar conexiones automáticas
  static async generateConnections(type: 'study-groups' | 'content'): Promise<{message: string}> {
    try {
      const response = await apiClient.post(`/moderators/analytics/generate-connections?type=${type}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al generar conexiones');
    }
  }
}

export default ModeratorService;