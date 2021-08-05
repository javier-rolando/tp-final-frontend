import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BorrarDialogComponent } from 'src/app/components/borrar-dialog/borrar-dialog.component';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  public posts: Post[] = [];
  public dataSource: MatTableDataSource<Post>;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private titleService: Title,
    private postsService: PostsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.titleService.setTitle('Postinger! | Mantenimiento de posts');
  }

  displayedColumns = [
    'imagen',
    'postId',
    'userId',
    'titulo',
    'categoria',
    'acciones',
  ];

  ngOnInit(): void {
    this.cargarPosts();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  cargarPosts() {
    this.postsService.cargarPosts().subscribe(
      ({ posts, total }) => {
        this.dataSource = new MatTableDataSource(posts);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = total;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  borrarPost(id: string) {
    const dialogRef = this.dialog.open(BorrarDialogComponent, {
      width: '400px',
      data: { toDelete: 'post' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postsService.borrarPost(id).subscribe(
          (resp: any) => {
            this.cargarPosts();
            this.openSnackBar(resp.mensaje, 'Aceptar');
          },
          (err) => {
            this.openSnackBar(err.error.mensaje, 'Aceptar');
          }
        );
      }
    });
  }
}
