import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  ComparePassForm,
  EmailResetForm,
  PassResetForm,
} from '../interfaces/password-form.interface';
import {
  ComparePass,
  ResetPass,
  SendEmail,
} from '../interfaces/resp-pass.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient, private router: Router) {}

  enviarEmail(formData: EmailResetForm) {
    return this.http.post<SendEmail>(`${base_url}/users/reset-email`, formData);
  }

  cambiarPass(formData: PassResetForm, token: string) {
    return this.http.put<ResetPass>(
      `${base_url}/users/reset?token=${token}`,
      formData
    );
  }

  compararPass(id: string, formData: ComparePassForm) {
    return this.http.post<ComparePass>(
      `${base_url}/users/${id}/password`,
      formData
    );
  }
}
