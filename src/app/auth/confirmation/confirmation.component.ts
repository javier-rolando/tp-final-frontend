import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private titleService: Title,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Postinger! | Confirmación de email');
  }

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  enviarEmail() {
    this.usuariosService.resendEmail().subscribe(
      (resp: any) => {
        this.openSnackBar(resp.mensaje, 'Aceptar');
      },
      (err) => {
        this.openSnackBar(err.error.mensaje, 'Aceptar');
      }
    );
  }
}
