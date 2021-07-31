import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EmailRecuperarPassComponent } from './email-recuperar-pass/email-recuperar-pass.component';
import { LoginComponent } from './login/login.component';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { RegisterComponent } from './register/register.component';
import { SentEmailResetComponent } from './sent-email-reset/sent-email-reset.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'recuperar-pass', component: EmailRecuperarPassComponent },
  { path: 'recuperar-pass-email', component: SentEmailResetComponent },
  { path: 'nueva-pass', component: RecuperarPassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
