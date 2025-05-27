// lib/api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

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
    // Retornar la respuesta completa, no solo data
    return response;
  },
  (error: AxiosError) => {
    // Manejo de errores mejorado
    if (error.response?.status === 401) {
      // Token expirado o inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        // Usar router de Next.js en lugar de window.location
        window.location.href = '/';
      }
    }
    
    // Estructura de error consistente
    const errorMessage = error.response?.data?.message || 
                        error.response?.data || 
                        error.message || 
                        'Error desconocido';
    
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