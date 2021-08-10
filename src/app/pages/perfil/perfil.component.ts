import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResp } from 'src/app/interfaces/error.interface';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarUsuario(id);
      this.cargarPostsPorUsuario(id);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  cargarUsuario(id: string) {
    this.usuariosService.getUsuario(id).subscribe(
      (usuario) => {
        this.usuario = usuario;
        this.titleService.setTitle(
          `Postinger! | Perfil de ${this.usuario.nombre}`
        );
      },
      (err: ErrorResp) => {
        if (err.status === 404) {
          this.router.navigateByUrl('/notfound', { skipLocationChange: true });
        } else {
          if (typeof err.error.mensaje === 'string') {
            this.openSnackBar(err.error.mensaje, 'Aceptar');
          } else {
            this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
            console.log(err);
          }
        }
      }
    );
  }

  cargarPostsPorUsuario(id: string) {
    this.postsService.cargarPostsPorUsuario(id).subscribe(
      (posts) => {
        this.posts = posts;
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
