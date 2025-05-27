// lib/api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

// Interfaces para manejo de errores
interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: string;
  status?: number;
}

interface CustomAxiosError extends AxiosError {
  response?: AxiosResponse<ApiErrorResponse>;
}

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar el token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    // Verificar si estamos en el cliente (browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: CustomAxiosError) => {
    // Manejo de errores mejorado
    if (error.response?.status === 401) {
      // Token expirado o inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = '/';
      }
    }
    
    // Extraer mensaje de error con tipado seguro
    const errorData = error.response?.data;
    let errorMessage = 'Error desconocido';
    
    if (errorData) {
      errorMessage = errorData.message || 
                    errorData.error || 
                    errorData.details || 
                    (typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

// Funciones helper para diferentes tipos de peticiones
export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get(url);
  return response.data;
};

export const apiPost = async <T>(url: string, data?: any): Promise<T> => {
  const response = await apiClient.post(url, data);
  return response.data;
};

export const apiPut = async <T>(url: string, data?: any): Promise<T> => {
  const response = await apiClient.put(url, data);
  return response.data;
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  const response = await apiClient.delete(url);
  return response.data;
};

export default apiClient;