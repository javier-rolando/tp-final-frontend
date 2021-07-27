import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css'],
})
export class BorrarUsuarioComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BorrarUsuarioComponent>) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }
}
