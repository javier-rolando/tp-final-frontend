import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { MaterialModule } from '../material/material.module';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    PagesComponent,
    CreatePostComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatSidenavModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
