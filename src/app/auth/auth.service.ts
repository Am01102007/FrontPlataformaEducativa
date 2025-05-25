import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of, throwError } from "rxjs"
import { catchError, tap } from "rxjs/operators"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  fullName: string
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    fullName: string
    email: string
    role: "estudiante" | "moderador"
  }
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://api.example.com" // Reemplazar con la URL real de tu API
  private tokenKey = "auth_token"
  private userKey = "user_data"

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Aquí deberías hacer la llamada real a tu API
    // return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)

    // Simulación para desarrollo
    return of({
      token: "fake-jwt-token",
      user: {
        id: "1",
        fullName: "Usuario de Prueba",
        email: credentials.email,
        role: "estudiante",
      },
    }).pipe(
      tap((response) => this.setSession(response)),
      catchError((error) => throwError(() => new Error("Error en el inicio de sesión"))),
    )
  }

  register(userData: RegisterData): Observable<AuthResponse> {
    // Aquí deberías hacer la llamada real a tu API
    // return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)

    // Simulación para desarrollo
    return of({
      token: "fake-jwt-token",
      user: {
        id: "1",
        fullName: userData.fullName,
        email: userData.email,
        role: "estudiante",
      },
    }).pipe(catchError((error) => throwError(() => new Error("Error en el registro"))))
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem(this.userKey)
    return userData ? JSON.parse(userData) : null
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResult.token)
    localStorage.setItem(this.userKey, JSON.stringify(authResult.user))
  }
}
