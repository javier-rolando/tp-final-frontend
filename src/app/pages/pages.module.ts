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

@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PagesComponent,
    CreatePostComponent,
    VerPostComponent,
    OpcionesComponent,
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
