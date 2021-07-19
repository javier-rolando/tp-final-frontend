import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerPostComponent } from './ver-post/ver-post.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: VerPostComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'crear', component: CreatePostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
