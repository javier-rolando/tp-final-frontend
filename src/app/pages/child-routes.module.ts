import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
