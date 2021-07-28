import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-dialog',
  templateUrl: './borrar-dialog.component.html',
  styleUrls: ['./borrar-dialog.component.css'],
})
export class BorrarDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BorrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }
}
