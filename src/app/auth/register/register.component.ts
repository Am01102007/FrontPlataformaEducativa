import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isLoading = false
  showPassword = false
  showConfirmPassword = false
  errorMessage = ""
  successMessage = ""

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    )
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password")?.value
    const confirmPassword = form.get("confirmPassword")?.value

    if (password !== confirmPassword) {
      form.get("confirmPassword")?.setErrors({ passwordMismatch: true })
      return { passwordMismatch: true }
    }

    return null
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true

      // Simulación de registro (reemplazar con llamada real al servicio)
      setTimeout(() => {
        this.isLoading = false
        this.successMessage = "¡Registro exitoso! Redirigiendo al inicio de sesión..."

        // Redireccionar después de mostrar el mensaje de éxito
        setTimeout(() => {
          this.router.navigate(["/auth/login"])
        }, 2000)
      }, 1500)
    } else {
      this.markFormGroupTouched(this.registerForm)
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword
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
