import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordarme: false,
  });

  login() {
    const { recordarme, ...loginData } = this.loginForm.value;

    this.usuariosService.login(loginData).subscribe(
      (resp: any) => {
        if (recordarme) {
          localStorage.setItem('token', resp.token);
        } else {
          sessionStorage.setItem('token', resp.token);
        }

        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
