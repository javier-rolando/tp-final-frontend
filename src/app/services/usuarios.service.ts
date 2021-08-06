import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UpdateUserForm } from '../interfaces/update-user-form.interface';
import { ChangePassForm } from '../interfaces/change-pass-form.interface';
import { GetUsuario, GetUsuarios } from '../interfaces/get-usuarios.interface';
import { CambiarRole } from '../interfaces/cambiar-role.interface';

const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return (
      localStorage.getItem('token') || sessionStorage.getItem('token') || ''
    );
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, formData);
  }

  validarUsuario(): Observable<boolean> {
    return this.http.get(`${base_url}/users`).pipe(
      map((resp: any) => {
        const { nombre, email, role, confirmado, _id, avatar, createdAt } =
          resp.usuario;

        this.usuario = new Usuario(
          nombre,
          email,
          role,
          confirmado,
          _id,
          avatar,
          createdAt
        );

        return true;
      }),
      catchError((error) => of(false))
    );
  }

  getUsuario(id: string) {
    return this.http.get<GetUsuario>(`${base_url}/users/${id}`).pipe(
      map((resp) => {
        const { nombre, email, role, confirmado, _id, avatar, createdAt } =
          resp.usuario;

        const usuario = new Usuario(
          nombre,
          email,
          role,
          confirmado,
          _id,
          avatar,
          createdAt
        );

        return usuario;
      })
    );
  }

  getUsuarios() {
    return this.http.get<GetUsuarios>(`${base_url}/users/all`).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              user.role,
              user.confirmado,
              user._id,
              user.avatar,
              user.createdAt
            )
        );

        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/users/login`, formData);
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  renewToken() {
    return this.http.get(`${base_url}/users/renew`);
  }

  resendEmail() {
    return this.http.get(`${base_url}/users/resend/${this.token}`);
  }

  actualizarUsuario(formData: UpdateUserForm) {
    return this.http.put(`${base_url}/users/${this.usuario._id}`, formData);
  }

  cambiarRole(id: string, data: CambiarRole) {
    return this.http.put(`${base_url}/users/${id}`, data);
  }

  cambiarPassword(formData: ChangePassForm) {
    return this.http.put(
      `${base_url}/users/${this.usuario._id}/password`,
      formData
    );
  }

  borrarUsuario(id: string) {
    return this.http.delete(`${base_url}/users/${id}`);
  }
}
