import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css'],
})
export class RecuperarPassComponent implements OnInit {
  private token: string;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private passwordService: PasswordService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.token = params['token'])
    );
  }

  public resetForm = this.fb.group({
    password: ['', Validators.required],
    password2: ['', Validators.required],
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  resetearPass() {
    if (this.resetForm.invalid) {
      return;
    }

    this.passwordService
      .cambiarPass(this.resetForm.value, this.token)
      .subscribe(
        (resp) => {
          console.log(resp);
          this.router.navigateByUrl('/login');
          this.openSnackBar('Contraseña actualizada', 'Aceptar');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
