import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Title } from '@angular/platform-browser';
import { ErrorResp } from 'src/app/interfaces/error.interface';
import { LoginForm } from 'src/app/interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Postinger! | Iniciar sesión');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['confirmado']) {
        this.openSnackBar(
          'Email confirmado! Ya podés iniciar sesión con tus datos',
          'Aceptar'
        );
      }
    });
  }

  public loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(100),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
    recordarme: false,
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const body: LoginForm = this.loginForm.value;
    const { recordarme, ...loginData } = body;

    this.usuariosService.login(loginData).subscribe(
      (resp) => {
        if (recordarme) {
          localStorage.setItem('token', resp.token);
        } else {
          sessionStorage.setItem('token', resp.token);
        }

        this.router.navigateByUrl('/');
        this.openSnackBar(resp.mensaje, 'Aceptar');
      },
      (err: ErrorResp) => {
        if (typeof err.error.mensaje === 'string') {
          this.openSnackBar(err.error.mensaje, 'Aceptar');
        } else {
          this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
          console.log(err);
        }
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'email':
        if (this.loginForm.get('email')?.hasError('required')) {
          return 'El email es obligatorio';
        } else if (this.loginForm.get('email')?.hasError('email')) {
          return 'El email es inválido';
        } else if (this.loginForm.get('email')?.hasError('minlength')) {
          return 'El email debe tener al menos 6 caracteres';
        } else if (this.loginForm.get('email')?.hasError('maxlength')) {
          return 'El email no debe tener más de 100 caracteres';
        }
        break;
      case 'password':
        if (this.loginForm.get('password')?.hasError('required')) {
          return 'La contraseña es obligatoria';
        } else if (this.loginForm.get('password')?.hasError('minlength')) {
          return 'La contraseña debe tener al menos 6 caracteres';
        } else if (this.loginForm.get('password')?.hasError('maxlength')) {
          return 'La contraseña no debe tener más de 100 caracteres';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }
}
