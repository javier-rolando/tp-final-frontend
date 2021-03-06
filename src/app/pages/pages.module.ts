import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { MaterialModule } from '../material/material.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { PipesModule } from '../pipes/pipes.module';
import { VerPostComponent } from './ver-post/ver-post.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { ComponentsModule } from '../components/components.module';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { PostsComponent } from './admin/posts/posts.component';
import { AdminComponent } from './admin/admin.component';
import { OpcionesPostComponent } from './opciones-post/opciones-post.component';

@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PagesComponent,
    CreatePostComponent,
    VerPostComponent,
    OpcionesComponent,
    UsuariosComponent,
    PostsComponent,
    AdminComponent,
    OpcionesPostComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
