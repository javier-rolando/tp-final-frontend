import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  public usuario: Usuario;
  public url: string;

  constructor(
    private usuariosService: UsuariosService,
    private postsService: PostsService,
    private router: Router
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {
    this.url = this.router.url;
  }

  likePost(id: string) {
    this.postsService.likePost(id).subscribe(
      (resp: any) => {
        this.post.likes = resp.likes;
        this.post.dislikes = resp.dislikes;
        this.post.likedBy = resp.likedBy;
        this.post.dislikedBy = resp.dislikedBy;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  dislikePost(id: string) {
    this.postsService.dislikePost(id).subscribe(
      (resp: any) => {
        this.post.likes = resp.likes;
        this.post.dislikes = resp.dislikes;
        this.post.likedBy = resp.likedBy;
        this.post.dislikedBy = resp.dislikedBy;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
