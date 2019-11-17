import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent, dateFormat } from './components/register/register.component';
import { AuthContainerComponent } from './containers/auth-container.component';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatDialogModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  NativeDateModule,
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { SharedModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { ToastModule } from 'primeng/toast';
import { IsAlreadyLoggedInGuard } from '../../guards/is-already-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthContainerComponent,
    // canActivate: [ IsAlreadyLoggedInGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [ IsAlreadyLoggedInGuard ]
  }
];

const primengModules = [];

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule, 
  NativeDateModule
];

@NgModule({
  declarations: [
    AuthContainerComponent,
    LoginComponent,
    ForgotPasswordDialogComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...primengModules,
    FlexLayoutModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ToastModule
  ],
  entryComponents: [ForgotPasswordDialogComponent],
  providers: [AuthService],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
