import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-recuperar-pass',
  templateUrl: './email-recuperar-pass.component.html',
  styleUrls: ['./email-recuperar-pass.component.css'],
})
export class EmailRecuperarPassComponent implements OnInit {
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private router: Router
  ) {
    this.titleService.setTitle('Postinger! | Recuperar contraseña');
  }

  ngOnInit(): void {}

  public emailToSendResetForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(100),
      ],
    ],
  });

  enviarEmail() {
    if (this.emailToSendResetForm.invalid) {
      return;
    }

    this.passwordService.enviarEmail(this.emailToSendResetForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigateByUrl('/recuperar-pass-email');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.emailToSendResetForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'email':
        if (this.emailToSendResetForm.get('email')?.hasError('required')) {
          return 'El email es obligatorio';
        } else if (this.emailToSendResetForm.get('email')?.hasError('email')) {
          return 'El email es inválido';
        } else if (
          this.emailToSendResetForm.get('email')?.hasError('minlength')
        ) {
          return 'El email debe tener al menos 6 caracteres';
        } else if (
          this.emailToSendResetForm.get('email')?.hasError('maxlength')
        ) {
          return 'El email no debe tener más de 100 caracteres';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }
}
