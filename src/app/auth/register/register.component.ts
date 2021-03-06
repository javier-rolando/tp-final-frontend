import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Title } from '@angular/platform-browser';
import { ErrorResp } from 'src/app/interfaces/error.interface';
import { RegisterForm } from 'src/app/interfaces/register-form.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public hide: boolean = true;
  public hide2: boolean = true;
  private emailYaExisteDebounce: NodeJS.Timeout;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Postinger! | Registro de usuario');
  }

  ngOnInit(): void {}

  public registerForm = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([A-Z]|[a-z])+$/),
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
        [this.emailYaExiste.bind(this)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      password2: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    } as AbstractControlOptions
  );

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  crearUsuario() {
    if (this.registerForm.invalid) {
      return;
    }

    const body: RegisterForm = this.registerForm.value;
    const { password2, ...formData } = body;

    this.usuariosService.crearUsuario(formData).subscribe(
      (resp) => {
        sessionStorage.setItem('token', resp.token);
        this.router.navigateByUrl('/confirmation');
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
    if (this.registerForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'nombre':
        if (this.registerForm.get('nombre')?.hasError('required')) {
          return 'El nombre es obligatorio';
        } else if (this.registerForm.get('nombre')?.hasError('pattern')) {
          return 'No se permiten caracteres especiales';
        } else if (this.registerForm.get('nombre')?.hasError('minlength')) {
          return 'El nombre debe tener al menos 3 caracteres';
        } else if (this.registerForm.get('nombre')?.hasError('maxlength')) {
          return 'El nombre no debe tener m??s de 30 caracteres';
        }
        break;
      case 'email':
        if (this.registerForm.get('email')?.hasError('required')) {
          return 'El email es obligatorio';
        } else if (this.registerForm.get('email')?.hasError('email')) {
          return 'El email es inv??lido';
        } else if (this.registerForm.get('email')?.hasError('minlength')) {
          return 'El email debe tener al menos 6 caracteres';
        } else if (this.registerForm.get('email')?.hasError('maxlength')) {
          return 'El email no debe tener m??s de 100 caracteres';
        } else if (this.registerForm.get('email')?.hasError('yaExiste')) {
          return 'El email ya existe';
        }
        break;
      case 'password':
        if (this.registerForm.get('password')?.hasError('required')) {
          return 'La contrase??a es obligatoria';
        } else if (this.registerForm.get('password')?.hasError('minlength')) {
          return 'La contrase??a debe tener al menos 6 caracteres';
        } else if (this.registerForm.get('password')?.hasError('maxlength')) {
          return 'La contrase??a no debe tener m??s de 100 caracteres';
        }
        break;
      case 'password2':
        if (
          this.registerForm.get('password2')?.hasError('noEsIgual') &&
          this.registerForm.get('password2')?.dirty
        ) {
          return 'Las contrase??as deben ser iguales';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string): ValidationErrors {
    return (controls: AbstractControl) => {
      const pass1Control = controls.get(pass1Name);
      const pass2Control = controls.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        return pass2Control?.setErrors(null);
      } else {
        return pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }

  emailYaExiste(control: FormControl) {
    clearTimeout(this.emailYaExisteDebounce);
    const q = new Promise((resolve, reject) => {
      this.emailYaExisteDebounce = setTimeout(() => {
        this.usuariosService.getUsuarios().subscribe((resp) => {
          resp.usuarios.map((usuario) => {
            if (control.value === usuario.email) {
              resolve({ yaExiste: true });
            }
          });
          resolve(null);
        });
      }, 1000);
    });
    return q;
  }
}
