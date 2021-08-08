import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { PostsComponent } from './admin/posts/posts.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { OpcionesPostComponent } from './opciones-post/opciones-post.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerPostComponent } from './ver-post/ver-post.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: VerPostComponent },
  { path: 'post/:id/opciones', component: OpcionesPostComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'perfil/:id/opciones', component: OpcionesComponent },
  { path: 'crear', component: CreatePostComponent },

  // Rutas de Admin
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'posts', component: PostsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
