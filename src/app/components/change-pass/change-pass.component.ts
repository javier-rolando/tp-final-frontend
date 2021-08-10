import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResp } from 'src/app/interfaces/error.interface';
import { PasswordService } from 'src/app/services/password.service';
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
  private cambiarPassDebounce: any;

  constructor(
    public dialogRef: MatDialogRef<ChangePassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private passwordService: PasswordService,
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
        [this.oldPassDistinta.bind(this)],
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

    const { confirmNewPass, ...formData } = this.changePasswordForm.value;

    this.usuariosService.cambiarPassword(formData).subscribe(
      (resp) => {
        this.dialogRef.close();
        this.openSnackBar('Contraseña actualizada', 'Aceptar');
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
        } else if (
          this.changePasswordForm.get('oldPass')?.hasError('passDistinta')
        ) {
          return 'La vieja contraseña es incorrecta';
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

  oldPassDistinta(control: FormControl) {
    clearTimeout(this.cambiarPassDebounce);
    const q = new Promise((resolve, reject) => {
      this.cambiarPassDebounce = setTimeout(() => {
        if (control.value.length > 5) {
          this.passwordService
            .compararPass(this.data.userId, control.value)
            .subscribe((resp: any) => {
              if (resp.mensaje === 'La contraseña es incorrecta') {
                resolve({ passDistinta: true });
              }
              resolve(null);
            });
        }
      }, 1000);
    });
    return q;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
