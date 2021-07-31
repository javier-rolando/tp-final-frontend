import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient, private router: Router) {}

  enviarEmail(formData: any) {
    return this.http.post(`${base_url}/users/reset-email`, formData);
  }

  cambiarPass(formData: any, token: string) {
    return this.http.put(`${base_url}/users/reset?token=${token}`, formData);
  }
}
