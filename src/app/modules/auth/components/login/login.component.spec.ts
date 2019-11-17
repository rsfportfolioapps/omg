import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from '../../auth-routing.module';
import { AuthReducer, metaReducers } from '../../store/reducers/auth.reducer';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

describe('LoginComponent', () => {
  let loginComp: LoginComponent;
  let loginFixture: ComponentFixture<LoginComponent>;
  let http: HttpClient;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AuthRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ app: AuthReducer }, { metaReducers })
      ],
      providers: [AuthService, HttpClient, MessageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    loginFixture = TestBed.createComponent(LoginComponent);
    loginComp = loginFixture.componentInstance;
    service = new AuthService(http);
    loginFixture.detectChanges();
  });

  it('should have username/password/button', async () => {
    loginFixture.whenStable().then(() => {
      let username = loginFixture.debugElement.query(By.css('input[name="username"]'));
      let password = loginFixture.debugElement.query(By.css('input[name="password"]'));
      let button = loginFixture.debugElement.query(By.css('.btn-login'));
      let checkbox = loginFixture.debugElement.query(By.css('.checkbox'));

      expect(username).not.toBeNull();
      expect(password).not.toBeNull();
      expect(button).not.toBeNull();
      expect(checkbox).not.toBeNull();
    });
  });

  it(`should have a form input as valid`, () => {
    loginComp.loginForm.controls['username'].setValue('rfuertes@expertcollege.com');
    loginComp.loginForm.controls['password'].setValue('p@55w0rd');

    expect(loginComp.loginForm.valid).toBeTruthy();
  });

  it(`should have form input as invalid`, () => {
    loginComp.loginForm.controls['username'].setValue('');
    loginComp.loginForm.controls['password'].setValue('');

    expect(loginComp.loginForm.valid).toBeFalsy();
  });

  it(`should call on submit method`, () => {
    spyOn(loginComp, 'onSubmit');
    let button = loginFixture.debugElement.query(By.css('.btn-login')).nativeElement;
    button.click();

    expect(loginComp.onSubmit).toHaveBeenCalled();
  });
});
