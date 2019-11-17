import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailRegex } from 'src/app/shared/validators/email.validator';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  public forgotPasswordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>, private formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])]
    });
   }

  ngOnInit(): void {
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSend(): void {
    const isEmailValid = this.forgotPasswordForm.valid;
    if (isEmailValid) {
      this.dialogRef.close(this.forgotPasswordForm.controls.email.value);
    }
  }

  public getErrorMessage(): string {
    const input = this.forgotPasswordForm.controls.email;
    if (input.hasError('required')) {
      return 'Email required';
    } else if (input.hasError('pattern')) {
      return 'Invalid Email';
    } else {
      return '';
    }
  }
}
