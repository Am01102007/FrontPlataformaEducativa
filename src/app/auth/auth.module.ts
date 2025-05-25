import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule, type Routes } from "@angular/router"

import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component"

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthLayoutComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModule {}
