import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatMenuModule],
  exports: [MatCardModule, MatMenuModule],
})
export class MaterialModule {}
