import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorResp } from 'src/app/interfaces/error.interface';
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
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {
    this.url = this.router.url;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  likePost(id: string) {
    this.postsService.likePost(id).subscribe(
      (resp) => {
        this.post.likes = resp.likes;
        this.post.dislikes = resp.dislikes;
        this.post.likedBy = resp.likedBy;
        this.post.dislikedBy = resp.dislikedBy;
      },
      (err: ErrorResp) => {
        if (typeof err.error.mensaje === 'string') {
          this.openSnackBar(err.error.mensaje, 'Aceptar');
        } else {
          this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
          console.log(err);
        }
      }
    );
  }

  dislikePost(id: string) {
    this.postsService.dislikePost(id).subscribe(
      (resp) => {
        this.post.likes = resp.likes;
        this.post.dislikes = resp.dislikes;
        this.post.likedBy = resp.likedBy;
        this.post.dislikedBy = resp.dislikedBy;
      },
      (err: ErrorResp) => {
        if (typeof err.error.mensaje === 'string') {
          this.openSnackBar(err.error.mensaje, 'Aceptar');
        } else {
          this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
          console.log(err);
        }
      }
    );
  }
}
