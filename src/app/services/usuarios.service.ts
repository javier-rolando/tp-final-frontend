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

const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, formData);
  }

  getUsuario(): Observable<boolean> {
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

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/users/login`, formData);
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }

  resendEmail() {
    return this.http.get(`${base_url}/users/resend/${this.token}`);
  }

  actualizarUsuario(formData: UpdateUserForm) {
    return this.http.put(`${base_url}/users/${this.usuario._id}`, formData);
  }

  cambiarPassword(formData: ChangePassForm) {
    return this.http.put(
      `${base_url}/users/${this.usuario._id}/password`,
      formData
    );
  }
}
