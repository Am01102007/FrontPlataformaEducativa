// services/authService.ts
import apiClient from '@/lib/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'MODERATOR';
  // Student specific fields
  academicInterests?: string[];
  fieldOfStudy?: string;
  educationLevel?: string;
  bio?: string;
  // Moderator specific fields
  department?: string;
  specialization?: string;
  accessLevel?: number;
  contactInfo?: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'STUDENT' | 'MODERATOR';
  active: boolean;
  // Student specific fields
  academicInterests?: string[];
  fieldOfStudy?: string;
  educationLevel?: string;
  bio?: string;
  connectionCount?: number;
  // Moderator specific fields
  department?: string;
  specialization?: string;
  accessLevel?: number;
  contactInfo?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  username: string;
  role: string;
}

export class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'user_data';

  // Login
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/api/v1/auth/login', credentials);
      
      // Guardar token y datos del usuario
      if (response.data.token) {
        localStorage.setItem(this.TOKEN_KEY, response.data.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify({
          username: response.data.username,
          role: response.data.role
        }));
      }
      
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error en el inicio de sesión');
    }
  }

  // Registro
  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/api/v1/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error((error as Error).message || 'Error en el registro');
    }
  }


  // Verificar si está autenticado
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Obtener token
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Obtener usuario actual
  static getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

}

export default AuthService;