import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EmailRecuperarPassComponent } from './email-recuperar-pass/email-recuperar-pass.component';
import { LoginComponent } from './login/login.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RegisterComponent } from './register/register.component';
import { SentEmailResetComponent } from './sent-email-reset/sent-email-reset.component';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [LoggedInGuard],
    component: RegisterComponent,
  },
  {
    path: 'login',
    canActivate: [LoggedInGuard],
    component: LoginComponent,
  },
  {
    path: 'confirmation',
    canActivate: [LoggedInGuard],
    component: ConfirmationComponent,
  },
  {
    path: 'recuperar-pass',
    canActivate: [LoggedInGuard],
    component: EmailRecuperarPassComponent,
  },
  {
    path: 'recuperar-pass-email',
    canActivate: [LoggedInGuard],
    component: SentEmailResetComponent,
  },
  {
    path: 'nueva-pass',
    canActivate: [LoggedInGuard],
    component: RecuperarPassComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
