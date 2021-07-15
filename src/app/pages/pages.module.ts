import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HomeComponent, PerfilComponent, PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatSidenavModule,
    MaterialModule,
  ],
})
export class PagesModule {}
