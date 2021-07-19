import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ver-post',
  templateUrl: './ver-post.component.html',
  styleUrls: ['./ver-post.component.css'],
})
export class VerPostComponent implements OnInit {
  public post: Post;
  public usuario: Usuario;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPost(id));
  }

  cargarPost(id: string) {
    this.postsService.cargarPostPorId(id).subscribe(
      (resp) => {
        this.post = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
