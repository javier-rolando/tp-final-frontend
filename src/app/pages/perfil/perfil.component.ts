import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public usuario: Usuario;
  public posts: Post[] = [];

  constructor(
    private titleService: Title,
    private usuariosService: UsuariosService,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarUsuario(id);
      this.cargarPostsPorUsuario(id);
    });
  }

  cargarUsuario(id: string) {
    this.usuariosService.getUsuario(id).subscribe(
      (usuario) => {
        this.usuario = usuario;
        this.titleService.setTitle(
          `Postinger! | Perfil de ${this.usuario.nombre}`
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargarPostsPorUsuario(id: string) {
    this.postsService.cargarPostsPorUsuario(id).subscribe(
      (posts) => {
        this.posts = posts;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
