// services/helpRequestService.ts
import apiClient from '@/lib/api';

export type HelpRequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  topic: string;
  priority: HelpRequestPriority;
  requesterId: string;
  requesterUsername: string;
  helperId?: string;
  helperUsername?: string;
  resolved: boolean;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHelpRequestData {
  title: string;
  description: string;
  topic: string;
  priority: HelpRequestPriority;
}

export class HelpRequestService {
  // Obtener todas las solicitudes de ayuda
  static async getAllHelpRequests(): Promise<HelpRequest[]> {
    try {
      const response = await apiClient.get('/help-requests');
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener solicitudes de ayuda');
    }
  }

  // Obtener solicitud de ayuda por ID
  static async getHelpRequestById(id: string): Promise<HelpRequest> {
    try {
      const response = await apiClient.get(`/help-requests/${id}`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener solicitud de ayuda');
    }
  }

  // Crear nueva solicitud de ayuda
  static async createHelpRequest(requestData: CreateHelpRequestData): Promise<HelpRequest> {
    try {
      const response = await apiClient.post('/help-requests', requestData);
      return response;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al crear solicitud de ayuda');
    }
  }

  // Actualizar solicitud de ayuda
  static async updateHelpRequest(id: string, requestData: CreateHelpRequestData): Promise<HelpRequest> {
    try {
      const response = await apiClient.put(`/help-requests/${id}`, requestData);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al actualizar solicitud de ayuda');
    }
  }

  // Eliminar solicitud de ayuda
  static async deleteHelpRequest(id: string): Promise<void> {
    try {
      await apiClient.delete(`/help-requests/${id}`);
    } catch (error) {
      throw new Error((error as Error).message || 'Error al eliminar solicitud de ayuda');
    }
  }

  // Ofrecer ayuda
  static async offerHelp(id: string): Promise<HelpRequest> {
    try {
      const response = await apiClient.post(`/help-requests/${id}/offer-help`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al ofrecer ayuda');
    }
  }

  // Resolver solicitud de ayuda
  static async resolveHelpRequest(id: string): Promise<HelpRequest> {
    try {
      const response = await apiClient.post(`/help-requests/${id}/resolve`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al resolver solicitud');
    }
  }

  // Obtener solicitudes activas
  static async getActiveHelpRequests(): Promise<HelpRequest[]> {
    try {
      const response = await apiClient.get('/help-requests/active');
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener solicitudes activas');
    }
  }

  // Obtener solicitudes por tópico
  static async getHelpRequestsByTopic(topic: string): Promise<HelpRequest[]> {
    try {
      const response = await apiClient.get(`/help-requests/topic/${encodeURIComponent(topic)}`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener solicitudes por tópico');
    }
  }

  // Buscar solicitudes por palabra clave
  static async searchActiveHelpRequestsByKeyword(keyword: string): Promise<HelpRequest[]> {
    try {
      const response = await apiClient.get(`/help-requests/search?keyword=${encodeURIComponent(keyword)}`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar solicitudes');
    }
  }

  // Obtener solicitudes creadas por un estudiante
  static async getHelpRequestsCreatedByStudent(studentId: string): Promise<HelpRequest[]> {
    try {
      const response = await apiClient.get(`/help-requests/created-by/${studentId}`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener solicitudes del estudiante');
    }
  }

  // Obtener solicitudes recomendadas para un estudiante
  static async getRecommendedHelpRequestsForStudent(studentId: string): Promise<HelpRequest[]> {
    try {
      const response = await apiClient.get(`/help-requests/recommended-for/${studentId}`);
      return response;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener recomendaciones');
    }
  }

  // Obtener siguiente solicitud de mayor prioridad
  static async getNextHighestPriorityRequest(): Promise<HelpRequest | null> {
    try {
      const response = await apiClient.get('/help-requests/next-priority');
      return response;
    } catch (error) {
      if (error?.status === 204) {
        return null; // No hay solicitudes
      }
      throw new Error((error as Error).message || 'Error al obtener siguiente solicitud');
    }
  }
}

export default HelpRequestService;