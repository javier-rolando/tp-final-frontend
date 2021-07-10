import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap } from 'rxjs/operators';

const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, formData);
  }

  resendEmail() {
    return this.http.get(`${base_url}/users/resend/${this.token}`);
  }
}
