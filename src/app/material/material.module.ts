import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
