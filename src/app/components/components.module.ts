import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniPostComponent } from './mini-post/mini-post.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MiniPostComponent],
  imports: [CommonModule, MaterialModule, PipesModule, RouterModule],
  exports: [MiniPostComponent],
})
export class ComponentsModule {}
