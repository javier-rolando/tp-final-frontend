import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniPostComponent } from './mini-post/mini-post.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BorrarUsuarioComponent } from './borrar-usuario/borrar-usuario.component';

@NgModule({
  declarations: [MiniPostComponent, ChangePassComponent, BorrarUsuarioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MiniPostComponent],
})
export class ComponentsModule {}
