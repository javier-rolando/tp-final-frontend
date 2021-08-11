import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrarDialog } from 'src/app/interfaces/data.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-borrar-dialog',
  templateUrl: './borrar-dialog.component.html',
  styleUrls: ['./borrar-dialog.component.css'],
})
export class BorrarDialogComponent implements OnInit {
  public usuario: Usuario;

  constructor(
    public dialogRef: MatDialogRef<BorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrarDialog,
    private usuariosService: UsuariosService
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }
}
