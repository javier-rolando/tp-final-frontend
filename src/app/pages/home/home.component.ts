import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public posts: Post[] = [];
  public cargando: boolean = true;
  public cargandoNuevos: boolean = false;
  public noPosts: boolean = true;
  private total: number | null;
  private categoriaTemp: string = 'todas';
  private pagina: number = 1;
  private paginaNueva: number = 1;
  private ctd: number = 5;

  private prueba: boolean = true;

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
    this.cargarPosts(this.ctd, this.pagina, '');

    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  cargarPosts(ctd: number, pagina: number, categoria: string) {
    if (this.posts.length === this.total) {
      return;
    }
    this.cargando = true;
    this.postsService.cargarPostsPaginado(ctd, pagina, categoria).subscribe(
      (resp) => {
        this.posts = resp.posts;
        this.total = resp.total;
        this.cargando = false;
        if (this.posts.length !== 0) {
          this.noPosts = false;
        }
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

  cargarPostsNuevos(ctd: number, pagina: number, categoria: string) {
    if (this.posts.length === this.total) {
      return;
    }
    if (!this.total) {
      return;
    }
    this.cargandoNuevos = true;
    this.postsService
      .cargarPostsPaginado(ctd, pagina, categoria)
      .subscribe((resp) => {
        this.posts = this.posts.concat(resp.posts);
        this.total = resp.total;
        this.cargandoNuevos = false;
      });
  }

  recibirCategoria(categoria: string) {
    if (this.categoriaTemp === categoria) {
      return;
    }

    this.paginaNueva = 1;
    this.total = null;

    if (categoria === 'todas') {
      this.categoriaTemp = categoria;
      this.cargarPosts(this.ctd, this.paginaNueva, '');
      return;
    }
    this.cargarPosts(this.ctd, this.paginaNueva, categoria);
    // this.postsFilter = this.posts.filter(
    //   (post) => post.categoria === categoria
    // );
    this.categoriaTemp = categoria;
    this.prueba = false;
  }

  scroll = (event: any) => {
    const top = event.srcElement.scrollTop;
    const height = event.srcElement.scrollHeight;
    const offset = event.srcElement.offsetHeight;

    if (!this.prueba && this.posts.length !== this.total) {
      this.prueba = true;
      return;
    }
    if (top > height - offset - 1) {
      if (this.categoriaTemp !== 'todas') {
        this.paginaNueva++;
        this.cargarPostsNuevos(this.ctd, this.paginaNueva, this.categoriaTemp);
        this.prueba = false;
        return;
      }
      this.paginaNueva++;
      this.cargarPostsNuevos(this.ctd, this.paginaNueva, '');
      this.prueba = false;
    }
  };

  // cargarPostsPorCategoria(categoria: string) {
  //   this.cargando = true;
  //   this.postsService.cargarPostsPorCategoria(this.ctd, this.pagina, categoria).subscribe(
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
