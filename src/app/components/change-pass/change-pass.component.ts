import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  public hide: boolean = true;
  public hide2: boolean = true;
  public hide3: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ChangePassComponent>,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  public changePasswordForm = this.fb.group(
    {
      oldPass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      newPass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      confirmNewPass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
    },
    {
      validators: this.passwordsIguales('newPass', 'confirmNewPass'),
    } as AbstractControlOptions
  );

  cambiarPassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.usuariosService
      .cambiarPassword(this.changePasswordForm.value)
      .subscribe(
        (resp) => {
          this.dialogRef.close();
          this.openSnackBar('Contraseña actualizada', 'Aceptar');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  campoNoValido(campo: string): boolean {
    if (this.changePasswordForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

  getMensajeError(campo: string): string | void {
    switch (campo) {
      case 'oldPass':
        if (this.changePasswordForm.get('oldPass')?.hasError('required')) {
          return 'La vieja contraseña es obligatoria';
        } else if (
          this.changePasswordForm.get('oldPass')?.hasError('minlength')
        ) {
          return 'La vieja contraseña debe tener al menos 6 caracteres';
        } else if (
          this.changePasswordForm.get('oldPass')?.hasError('maxlength')
        ) {
          return 'La vieja contraseña no debe tener más de 100 caracteres';
        }
        break;
      case 'newPass':
        if (this.changePasswordForm.get('newPass')?.hasError('required')) {
          return 'La nueva contraseña es obligatoria';
        } else if (
          this.changePasswordForm.get('newPass')?.hasError('minlength')
        ) {
          return 'La nueva contraseña debe tener al menos 6 caracteres';
        } else if (
          this.changePasswordForm.get('newPass')?.hasError('maxlength')
        ) {
          return 'La nueva contraseña no debe tener más de 100 caracteres';
        }
        break;
      case 'confirmNewPass':
        if (
          this.changePasswordForm
            .get('confirmNewPass')
            ?.hasError('noEsIgual') &&
          this.changePasswordForm.get('confirmNewPass')?.dirty
        ) {
          return 'Las nuevas contraseñas deben ser iguales';
        }
        break;
      default:
        return 'Ha ocurrido un error';
    }
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
