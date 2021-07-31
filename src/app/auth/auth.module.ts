import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MaterialModule } from '../material/material.module';
import { RecuperarPassComponent } from './recuperar-pass/recuperar-pass.component';
import { EmailRecuperarPassComponent } from './email-recuperar-pass/email-recuperar-pass.component';
import { SentEmailResetComponent } from './sent-email-reset/sent-email-reset.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ConfirmationComponent, RecuperarPassComponent, EmailRecuperarPassComponent, SentEmailResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthModule {}
