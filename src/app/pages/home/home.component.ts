import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ErrorResp } from 'src/app/interfaces/error.interface';
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
  public postsFilter: Post[] = [];
  public cargando: boolean = true;
  private categoriaTemp: string;

  constructor(
    private titleService: Title,
    private usuariosService: UsuariosService,
    private postsService: PostsService,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = usuariosService.usuario;
    this.titleService.setTitle('Postinger! | Home');
  }

  ngOnInit(): void {
    this.cargarPosts();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  cargarPosts() {
    this.cargando = true;
    this.postsService.cargarPosts().subscribe(
      (resp: any) => {
        this.posts = resp.posts;
        this.postsFilter = resp.posts;
        this.cargando = false;
      },
      (err: ErrorResp) => {
        if (typeof err.error.mensaje === 'string') {
          this.openSnackBar(err.error.mensaje, 'Aceptar');
        } else {
          this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
          console.log(err);
        }
        this.cargando = false;
      }
    );
  }

  recibirCategoria(categoria: string) {
    if (this.categoriaTemp === categoria) {
      return;
    }

    if (categoria === 'Todas') {
      this.categoriaTemp = categoria;
      this.postsFilter = this.posts;
      return;
    }

    // this.cargarPostsPorCategoria(categoria);
    this.postsFilter = this.posts.filter(
      (post) => post.categoria === categoria
    );
    this.categoriaTemp = categoria;
  }

  // cargarPostsPorCategoria(categoria: string) {
  //   this.cargando = true;
  //   this.postsService.cargarPostsPorCategoria(categoria).subscribe(
  //     (posts) => {
  //       this.posts = posts;
  //       this.cargando = false;
  //     },
  //     (err: ErrorResp) => {
  //       if (typeof err.error.mensaje === 'string') {
  //         this.openSnackBar(err.error.mensaje, 'Aceptar');
  //       } else {
  //         this.openSnackBar('Ha ocurrido un error inesperado', 'Aceptar');
  //         console.log(err);
  //       }
  //       this.cargando = false;
  //     }
  //   );
  // }
}
