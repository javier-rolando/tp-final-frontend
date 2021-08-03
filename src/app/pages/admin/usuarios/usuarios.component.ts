import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BorrarDialogComponent } from 'src/app/components/borrar-dialog/borrar-dialog.component';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public selectedValue: string;
  public usuarios: Usuario[] = [];
  public dataSource: MatTableDataSource<Usuario>;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  private usuario: Usuario;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.usuario = usuariosService.usuario;
  }

  displayedColumns = [
    'avatar',
    'id',
    'email',
    'nombre',
    'role',
    'confirmado',
    'acciones',
  ];

  public categorias: Role[] = [
    { value: 'ADMIN_ROLE', viewValue: 'Admin' },
    { value: 'USER_ROLE', viewValue: 'User' },
  ];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      ({ total, usuarios }) => {
        this.dataSource = new MatTableDataSource(usuarios);
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

  cambiarRole(
    id: string,
    nombre: string,
    email: string,
    role: 'ADMIN_ROLE' | 'USER_ROLE'
  ) {
    const body = {
      nombre,
      email,
      role,
    };

    this.usuariosService.cambiarRole(id, body).subscribe(
      (resp) => {
        console.log(resp);
        this.openSnackBar('Role actualizado', 'Aceptar');
      },
      (err) => {
        console.log(err);
        this.openSnackBar(err.error.mensaje, 'Aceptar');
      }
    );
  }

  borrarUsuario(id: string) {
    if (id === this.usuario._id) {
      this._snackBar.open('No puede borrarse a sí mismo', 'Aceptar', {
        duration: 5000,
      });
      return;
    }

    const dialogRef = this.dialog.open(BorrarDialogComponent, {
      width: '400px',
      data: { toDelete: 'usuario' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usuariosService.borrarUsuario(id).subscribe(
          (resp: any) => {
            this.cargarUsuarios();
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