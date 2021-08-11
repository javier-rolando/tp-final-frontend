import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResp } from 'src/app/interfaces/error.interface';
import { PassResetForm } from 'src/app/interfaces/password-form.interface';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css'],
})
export class RecuperarPassComponent implements OnInit {
  private token: string;
  public hide: boolean = true;
  public hide2: boolean = true;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private passwordService: PasswordService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Postinger! | Ingresar nueva contraseña');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.token = params['token'])
    );
  }

  public resetForm = this.fb.group(
    {
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

  resetearPass() {
    if (this.resetForm.invalid) {
      return;
    }

    const body: PassResetForm = this.resetForm.value;
    const { password2, ...formData } = body;

    this.passwordService.cambiarPass(formData, this.token).subscribe(
      (resp) => {
        this.router.navigateByUrl('/login');
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

  campoNoValido(campo: string): boolean {
    if (this.resetForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'password':
        if (this.resetForm.get('password')?.hasError('required')) {
          return 'La contraseña es obligatoria';
        } else if (this.resetForm.get('password')?.hasError('minlength')) {
          return 'La contraseña debe tener al menos 6 caracteres';
        } else if (this.resetForm.get('password')?.hasError('maxlength')) {
          return 'La contraseña no debe tener más de 100 caracteres';
        }
        break;
      case 'password2':
        if (
          this.resetForm.get('password2')?.hasError('noEsIgual') &&
          this.resetForm.get('password2')?.dirty
        ) {
          return 'Las contraseñas deben ser iguales';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
  }
}
