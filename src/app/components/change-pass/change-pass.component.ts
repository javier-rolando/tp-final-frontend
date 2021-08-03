import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  public changePasswordForm = this.fb.group({
    oldPass: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
    newPass: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
    confirmNewPass: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
  });

  cambiarPassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    console.log(this.changePasswordForm.value);

    this.usuariosService
      .cambiarPassword(this.changePasswordForm.value)
      .subscribe(
        (resp) => {
          console.log(resp);
          this.dialogRef.close();
          this.openSnackBar('Contraseña actualizada', 'Aceptar');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
