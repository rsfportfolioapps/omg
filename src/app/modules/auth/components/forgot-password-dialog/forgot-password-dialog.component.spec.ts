import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatDialogRef } from '@angular/material';

describe('LoginComponent', () => {
  let forgotPasswordDialogComponent: ForgotPasswordDialogComponent;
  let forgotPasswordFixture: ComponentFixture<ForgotPasswordDialogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordDialogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [HttpClient, {
        provide: MatDialogRef
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    forgotPasswordFixture = TestBed.createComponent(ForgotPasswordDialogComponent);
    forgotPasswordDialogComponent = forgotPasswordFixture.componentInstance;
    forgotPasswordFixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(ForgotPasswordDialogComponent).toBeTruthy();
  });

  it('should have email/button', async () => {
    forgotPasswordFixture.whenStable().then(() => {
      let email = forgotPasswordFixture.debugElement.query(By.css('input[name="email"]'));
      let btnCancel = forgotPasswordFixture.debugElement.query(By.css('.btn-cancel'));
      let btnSend = forgotPasswordFixture.debugElement.query(By.css('.btn-send'));
      expect(email).not.toBeNull();
      expect(btnCancel).not.toBeNull();
      expect(btnSend).not.toBeNull();
    });
  });

  it(`should button exist`, () => {
    let btnSend = forgotPasswordFixture.debugElement.query(By.css('.btn-send'));
    expect(btnSend).not.toBeNull();
  });
});
