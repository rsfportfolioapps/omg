import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { emailRegex } from 'src/app/shared/validators/email.validator';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducers/auth.reducer';
import { Login } from '../../store/actions/auth.action';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { Subject } from 'rxjs';
import { ToastMessage } from 'src/app/models/toast.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoginBtnDisabled: boolean;
  public toastTrigger$ = new Subject<ToastMessage>();

  constructor(private store: Store<AuthState>, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [null, Validators.required],
      rememberMe: [false, []]
    });
  }

  ngOnInit(): void {
    this.isLoginBtnDisabled = false;
  }

  public onSubmit(): void {

    // add validations here before dispatching
    if ((this.isFormFieldValid('username')) && (this.isFormFieldValid('password'))) {
      this.isLoginBtnDisabled = true;
      this.store.dispatch(new Login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      }));
    }
  }

  public isFormFieldValid(formField: string): boolean {
    return ((this.loginForm != null) &&
            (this.loginForm.controls != null)  &&
            (this.loginForm.controls[formField.toLowerCase()] != null) &&
            (!this.loginForm.controls[formField.toLowerCase()].invalid)) ? true : false;
  }

  public getErrorMessage(formField: string): string {
    let errorMsg = '';
    switch (formField.toLowerCase()) {
      case 'username':
        if ((this.loginForm != null) && (this.loginForm.controls != null)  &&
            (this.loginForm.controls.username != null)) {
          const controlValue = this.loginForm.controls.username;
          errorMsg = controlValue.hasError('required') ? 'Username required'
                      : controlValue.hasError('pattern') ? 'Invalid username'
                      : '';
        }
        break;
      case 'password':
        if ((this.loginForm != null) && (this.loginForm.controls != null)  &&
            (this.loginForm.controls.password != null)) {
          const controlValue = this.loginForm.controls.password;
          errorMsg = controlValue.hasError('required') ? 'Password required' : '';
        }
        break;
    }

    return errorMsg;
  }

  public openForgotPasswordDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, { width: '481px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let toast = {} as ToastMessage;
        toast.severity = 'success';
        toast.summary = 'Success';
        toast.detail = `Email sent (${result})`;
        this.toastTrigger$.next(toast);
      }
    });
  }
}
