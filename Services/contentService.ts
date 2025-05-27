// services/contentService.ts
import apiClient from '@/lib/api';

export type ContentType = 'DOCUMENT' | 'VIDEO' | 'LINK' | 'IMAGE' | 'CODE';

export interface Content {
  id: string;
  title: string;
  description: string;
  content?: string; // Agregar campo content que usa el backend
  contentUrl?: string;
  resourceUrl?: string; // Campo que usa el backend
  contentType: ContentType;
  tags: string[];
  authorId: string;
  authorUsername: string;
  averageRating: number;
  ratingCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentData {
  title: string;
  description: string;
  content?: string; // Campo para el contenido textual
  contentUrl?: string;
  resourceUrl?: string; // Campo del backend
  contentType: ContentType;
  tags: string[];
  authorUsername: string; // Requerido por el backend
}

export interface RateContentData {
  rating: number;
  comment?: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export class ContentService {
  // Obtener todos los contenidos con paginación
  static async getAllContents(page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenidos');    
    }
  }

  // Obtener contenido por ID
  static async getContentById(id: string): Promise<Content> {
    try {
      const response = await apiClient.get(`/api/v1/contents/${id}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenido');
    }
  }

  // Crear nuevo contenido
  static async createContent(contentData: CreateContentData): Promise<Content> {
    try {
      console.log('📝 Sending content data:', contentData);
      const response = await apiClient.post('/api/v1/contents', contentData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al crear contenido');
    }
  }

  // Actualizar contenido
  static async updateContent(id: string, contentData: CreateContentData): Promise<Content> {
    try {
      const response = await apiClient.put(`/api/v1/contents/${id}`, contentData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al actualizar contenido');
    }
  }

  // Eliminar contenido
  static async deleteContent(id: string): Promise<void> {
    try {
      await apiClient.delete(`/api/v1/contents/${id}`);
    } catch (error) {
      throw new Error((error as Error).message || 'Error al eliminar contenido');
    }
  }

  // Calificar contenido
  static async rateContent(id: string, ratingData: RateContentData): Promise<Content> {
    try {
      const response = await apiClient.post(`/api/v1/contents/${id}/rate`, ratingData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al calificar contenido');
    }
  }

  // Obtener contenidos por autor
  static async getContentsByAuthor(authorId: string, page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/author/${authorId}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenido');
    }
  }

  // Buscar contenidos por palabra clave
  static async searchContentsByKeyword(keyword: string, page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar contenido');
    }
  }

  // Obtener contenidos por etiqueta
  static async getContentsByTag(tag: string, page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/tag/${encodeURIComponent(tag)}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenidos por etiqueta');
    }
  }

  // Obtener contenidos mejor calificados
  static async getTopRatedContents(page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/top-rated?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenidos mejor calificados');
    }
  }

  // Obtener contenidos más vistos
  static async getMostViewedContents(page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/most-viewed?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenidos más vistos');
    }
  }

  // Obtener contenidos recientes
  static async getRecentContents(page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/recent?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenidos recientes');
    }
  }

  // Obtener contenidos de miembros del grupo de estudio
  static async getContentsByStudyGroupMembers(studentId: string, page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/study-group-members/${studentId}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener contenidos de compañeros de grupo');
    }
  }

  // Obtener recomendaciones de contenido
  static async getContentRecommendations(studentId: string, page: number = 0, size: number = 10): Promise<PagedResponse<Content>> {
    try {
      const response = await apiClient.get(`/api/v1/contents/recommendations/${studentId}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al obtener recomendaciones');
    }
  }

  // Buscar contenidos por título
  static async searchContentsByTitle(title: string): Promise<Content[]> {
    try {
      const response = await apiClient.get(`/api/v1/contents/title-search/${encodeURIComponent(title)}`);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error al buscar por título');
    }
  }
}

export default ContentService;