import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-email-recuperar-pass',
  templateUrl: './email-recuperar-pass.component.html',
  styleUrls: ['./email-recuperar-pass.component.css'],
})
export class EmailRecuperarPassComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public emailToSendResetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  enviarEmail() {
    if (this.emailToSendResetForm.invalid) {
      return;
    }

    this.passwordService.enviarEmail(this.emailToSendResetForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigateByUrl('/recuperar-pass-email');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
