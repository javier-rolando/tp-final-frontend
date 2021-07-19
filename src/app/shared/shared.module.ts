import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { PostComponent } from './post/post.component';
import { MaterialModule } from '../material/material.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent,
    PostComponent,
    CategoriasComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, PipesModule],
  exports: [
    HeaderComponent,
    SidenavListComponent,
    PostComponent,
    CategoriasComponent,
    PipesModule,
  ],
})
export class SharedModule {}
