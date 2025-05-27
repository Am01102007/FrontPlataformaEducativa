// services/studyGroupService.ts
import apiClient from '@/lib/api';

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  topics: string[];
  memberIds: string[];
  memberUsernames: string[];
  active: boolean;
  maxCapacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudyGroupData {
  name: string;
  description?: string;
  topics: string[];
  maxCapacity?: number;
}

export class StudyGroupService {
  // Obtener todos los grupos de estudio
  static async getAllStudyGroups(): Promise<StudyGroup[]> {
    try {
      const response = await apiClient.get('/study-groups');
      return response.data.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al obtener grupos de estudio');
    }
  }

  // Obtener grupo de estudio por ID
  static async getStudyGroupById(id: string): Promise<StudyGroup> {
    try {
      const response = await apiClient.get(`/study-groups/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al obtener grupo de estudio');
    }
  }

  // Crear nuevo grupo de estudio
  static async createStudyGroup(groupData: CreateStudyGroupData): Promise<StudyGroup> {
    try {
      const response = await apiClient.post('/study-groups', groupData);
      return response.data.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al crear grupo de estudio');
    }
  }

  // Actualizar grupo de estudio
  static async updateStudyGroup(id: string, groupData: CreateStudyGroupData): Promise<StudyGroup> {
    try {
      const response = await apiClient.put(`/study-groups/${id}`, groupData);
      return response.data.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al actualizar grupo de estudio');
    }
  }

  // Eliminar grupo de estudio (solo moderadores)
  static async deleteStudyGroup(id: string): Promise<void> {
    try {
      await apiClient.delete(`/study-groups/${id}`);
    } catch (error) {
      throw new Error((error as Error).message ||'Error al eliminar grupo de estudio');
    }
  }

  // Unirse a un grupo de estudio
  static async joinStudyGroup(id: string): Promise<StudyGroup> {
    try {
      const response = await apiClient.post(`/study-groups/${id}/join`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al unirse al grupo');
    }
  }

  // Abandonar un grupo de estudio
  static async leaveStudyGroup(id: string): Promise<StudyGroup> {
    try {
      const response = await apiClient.post(`/study-groups/${id}/leave`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al abandonar el grupo');
    }
  }

  // Buscar grupos por tópico
  static async findStudyGroupsByTopic(topic: string): Promise<StudyGroup[]> {
    try {
      const response = await apiClient.get(`/study-groups/topic/${encodeURIComponent(topic)}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al buscar grupos por tópico');
    }
  }

  // Obtener grupos de un estudiante
  static async findStudyGroupsByStudentId(studentId: string): Promise<StudyGroup[]> {
    try {
      const response = await apiClient.get(`/study-groups/student/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al obtener grupos del estudiante');
    }
  }

  // Obtener grupos disponibles (con espacio)
  static async findAvailableStudyGroups(): Promise<StudyGroup[]> {
    try {
      const response = await apiClient.get('/study-groups/available');
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al obtener grupos disponibles');
    }
  }

  // Obtener recomendaciones de grupos por intereses
  static async recommendStudyGroupsByInterests(studentId: string): Promise<StudyGroup[]> {
    try {
      const response = await apiClient.get(`/study-groups/recommendations/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al obtener recomendaciones de grupos');
    }
  }

  // Obtener grupos activos con mínimo de miembros
  static async findActiveGroupsWithMinMembers(minMembers: number = 2): Promise<StudyGroup[]> {
    try {
      const response = await apiClient.get(`/study-groups/active?minMembers=${minMembers}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al obtener grupos activos');
    }
  }

  // Crear grupo automáticamente (solo moderadores)
  static async createStudyGroupAutomatically(topics: string[], maxCapacity?: number): Promise<StudyGroup> {
    try {
      const params = maxCapacity ? `?maxCapacity=${maxCapacity}` : '';
      const response = await apiClient.post(`/study-groups/auto-generate${params}`, topics);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message ||'Error al crear grupo automáticamente');
    }
  }
}

export default StudyGroupService;