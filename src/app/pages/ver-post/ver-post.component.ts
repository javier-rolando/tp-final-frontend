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
  selector: 'app-ver-post',
  templateUrl: './ver-post.component.html',
  styleUrls: ['./ver-post.component.css'],
})
export class VerPostComponent implements OnInit {
  public post: Post;
  public usuario: Usuario;
  public cargando: boolean = true;

  constructor(
    private titleService: Title,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = usuariosService.usuario;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPost(id));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  cargarPost(id: string) {
    this.cargando = true;
    this.postsService.cargarPostPorId(id).subscribe(
      (post) => {
        this.post = post;
        this.titleService.setTitle(`Postinger! | ${this.post.titulo}`);
        this.cargando = false;
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
        this.cargando = false;
      }
    );
  }
}
