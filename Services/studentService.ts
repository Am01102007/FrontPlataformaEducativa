// services/studentService.ts
import apiClient from '@/lib/api';
import { User } from '@/services/authService'; 

export interface Student extends User {
  academicInterests: string[];
  fieldOfStudy: string;
  educationLevel: string;
  bio?: string;
  connectionCount: number;
}

export interface UpdateStudentData {
  username?: string;
  email?: string;
  fullName?: string;
  academicInterests?: string[];
  fieldOfStudy?: string;
  educationLevel?: string;
  bio?: string;
}

export interface StudentConnection {
  id: string;
  studentA: string;
  studentB: string;
  strength: number;
  commonInterests: string[];
  lastInteraction: string;
}

export interface CreateConnectionData {
  studentIdA: string;
  studentIdB: string;
  commonInterests: string[];
}

export interface UpdateConnectionData {
  studentIdA: string;
  studentIdB: string;
  strengthChange: number;
}

export class StudentService {
  // Obtener todos los estudiantes (solo moderadores)
  static async getAllStudents(): Promise<Student[]> {
    try {
      const response = await apiClient.get('/students');
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener estudiantes');
    }
  }

  // Obtener estudiante por ID
  static async getStudentById(id: string): Promise<Student> {
    try {
      const response = await apiClient.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener estudiante');
    }
  }

  // Obtener estudiante por username
  static async getStudentByUsername(username: string): Promise<Student> {
    try {
      const response = await apiClient.get(`/students/username/${username}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener estudiante');
    }
  }

  // Actualizar estudiante
  static async updateStudent(id: string, studentData: UpdateStudentData): Promise<Student> {
    try {
      const response = await apiClient.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al actualizar estudiante');
    }
  }

  // Cambiar contraseña
  static async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<Student> {
    try {
      const response = await apiClient.put(`/students/${id}/password`, {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al cambiar contraseña');
    }
  }

  // Buscar estudiantes por interés
  static async findStudentsByInterest(interest: string): Promise<Student[]> {
    try {
      const response = await apiClient.get(`/students/interests/${encodeURIComponent(interest)}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar estudiantes por interés');
    }
  }

  // Buscar estudiantes por campo de estudio
  static async findStudentsByFieldOfStudy(field: string): Promise<Student[]> {
    try {
      const response = await apiClient.get(`/students/fields/${encodeURIComponent(field)}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar estudiantes por campo');
    }
  }

  // Buscar estudiantes por grupo de estudio
  static async findStudentsByStudyGroup(groupId: string): Promise<Student[]> {
    try {
      const response = await apiClient.get(`/students/groups/${groupId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar estudiantes por grupo');
    }
  }

  // Buscar estudiantes con grupos en común
  static async findStudentsWithCommonGroups(studentId: string): Promise<Student[]> {
    try {
      const response = await apiClient.get(`/students/common-groups/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar estudiantes con grupos comunes');
    }
  }

  // Obtener todos los intereses académicos
  static async getAllAcademicInterests(): Promise<string[]> {
    try {
        const response = await apiClient.get('/students/all-interests');
        return response.data as string[]; // Extraer la data y asegurarse de que es un array
    } catch (error) {
        throw new Error((error as Error).message || 'Error al obtener intereses académicos');
    }
}

  // Obtener todos los campos de estudio
  static async getAllFieldsOfStudy(): Promise<string[]> {
    try {
        const response = await apiClient.get('/students/all-fields');
        return response.data as string[]; // Extraer la data y asegurarse de que es un array
    } catch (error) {
        throw new Error((error as Error).message || 'Error al obtener campos de estudio');
    }
}

  // Obtener conexiones de un estudiante
  static async getStudentConnections(id: string): Promise<any[]> {
    try {
      const response = await apiClient.get(`/students/${id}/connections`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener conexiones del estudiante');
    }
  }

  // Obtener recomendaciones para un estudiante
  static async getStudentRecommendations(id: string): Promise<Record<string, number>> {
    try {
      const response = await apiClient.get(`/students/${id}/recommendations`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener recomendaciones');
    }
  }

  // Crear conexión entre estudiantes
  static async createConnection(connectionData: CreateConnectionData): Promise<any> {
    try {
      const response = await apiClient.post('/students/connections', connectionData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al crear conexión');
    }
  }

  // Actualizar conexión entre estudiantes
  static async updateConnection(connectionData: UpdateConnectionData): Promise<any> {
    try {
      const response = await apiClient.put('/students/connections', connectionData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al actualizar conexión');
    }
  }

  // Eliminar conexión entre estudiantes
  static async deleteConnection(studentIdA: string, studentIdB: string): Promise<void> {
    try {
      await apiClient.delete('/students/connections', {
        data: { studentIdA, studentIdB }
      });
    } catch (error) {
      throw new Error((error as Error).message || 'Error al eliminar conexión');
    }
  }

  // Encontrar camino más corto entre estudiantes
  static async findShortestPath(startId: string, endId: string): Promise<any[]> {
    try {
      const response = await apiClient.get(`/students/path?startId=${startId}&endId=${endId}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al encontrar camino más corto');
    }
  }
}

export default StudentService;