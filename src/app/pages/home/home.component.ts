import { Component, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public usuario: Usuario;
  public posts: Post[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private postsService: PostsService
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts() {
    this.postsService.cargarPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  recibirCategoria(categoria: string) {
    if (categoria === 'todas') {
      return this.cargarPosts();
    }

    this.cargarPostsPorCategoria(categoria);
  }

  cargarPostsPorCategoria(categoria: string) {
    this.postsService.cargarPostsPorCategoria(categoria).subscribe(
      (posts) => {
        this.posts = posts;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
