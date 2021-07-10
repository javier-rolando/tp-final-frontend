import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // public formSubmitido = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private router: Router
  ) {}

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

  crearUsuario() {
    // this.formSubmitido = true;

    if (this.registerForm.invalid) {
      return;
    }

    const { password2, ...formData } = this.registerForm.value;

    console.log(this.registerForm.value);
    this.usuariosService.crearUsuario(formData).subscribe(
      (resp: any) => {
        console.log(resp);
        this.authService.authenticate(resp.token);
        this.router.navigateByUrl('/confirmation');
      },
      (err) => {
        console.log(err);
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
          return 'El nombre no debe tener más de 30 caracteres';
        }
        break;
      case 'email':
        if (this.registerForm.get('email')?.hasError('required')) {
          return 'El email es obligatorio';
        }
        if (this.registerForm.get('email')?.hasError('email')) {
          return 'El email es inválido';
        } else if (this.registerForm.get('email')?.hasError('minlength')) {
          return 'El email debe tener al menos 6 caracteres';
        } else if (this.registerForm.get('email')?.hasError('maxlength')) {
          return 'El email no debe tener más de 100 caracteres';
        }
        break;
      case 'password':
        if (this.registerForm.get('password')?.hasError('required')) {
          return 'La contraseña es obligatoria';
        } else if (this.registerForm.get('password')?.hasError('minlength')) {
          return 'La contraseña debe tener al menos 6 caracteres';
        } else if (this.registerForm.get('password')?.hasError('maxlength')) {
          return 'La contraseña no debe tener más de 100 caracteres';
        }
        break;
      case 'password2':
        if (
          this.registerForm.get('password2')?.hasError('noEsIgual') &&
          this.registerForm.get('password2')?.dirty
        ) {
          return 'Las contraseñas deben ser iguales';
        }
        break;
      default:
        return 'Error';
    }
  }

  // passwordsNoValidas() {
  //   const pass1 = this.registerForm.get('password')?.value;
  //   const pass2 = this.registerForm.get('password2')?.value;

  //   if (pass1 !== pass2 && this.formSubmitido) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  passwordsIguales(
    pass1Name: string,
    pass2Name: string
  ): ValidationErrors | null {
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
}
