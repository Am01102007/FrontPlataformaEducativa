import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isLoading = false
  showPassword = false
  errorMessage = ""

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true

      // Simulación de login (reemplazar con llamada real al servicio)
      setTimeout(() => {
        this.isLoading = false
        // Navegar a la página principal después del login exitoso
        this.router.navigate(["/dashboard"])
      }, 1500)
    } else {
      this.markFormGroupTouched(this.loginForm)
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  // Función auxiliar para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched()
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control)
      }
    })
  }
}
