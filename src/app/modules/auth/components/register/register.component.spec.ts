import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from '../../auth-routing.module';
import { AuthReducer, metaReducers } from '../../store/reducers/auth.reducer';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let registerComp: RegisterComponent;
  let registerFixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AuthRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ app: AuthReducer }, { metaReducers })
      ],
      providers: [AuthService, HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    registerFixture = TestBed.createComponent(RegisterComponent);
    registerComp = registerFixture.componentInstance;
    registerFixture.detectChanges();
  });

  it('should have all needed fields/buttons', async () => {
    registerFixture.whenStable().then(() => {
      let firstname = registerFixture.debugElement.query(By.css('input[name="firstName"]'));
      let middlename = registerFixture.debugElement.query(By.css('input[name="middleName"]'));
      let surname = registerFixture.debugElement.query(By.css('input[name="lastName"]'));
      let birthdate = registerFixture.debugElement.query(By.css('input[name="birthDate"]'));
      let position = registerFixture.debugElement.query(By.css('mat-select[name="position"]'));
      let gender = registerFixture.debugElement.query(By.css('mat-select[name="gender"]'));
      let office = registerFixture.debugElement.query(By.css('mat-select[name="office"]'));
      let username = registerFixture.debugElement.query(By.css('input[name="username"]'));
      let language = registerFixture.debugElement.query(By.css('input[name="language"]'));
      let password = registerFixture.debugElement.query(By.css('input[name="password"]'));
      let confirmPassword = registerFixture.debugElement.query(By.css('input[name="rePassword"]'));

      expect(firstname).not.toBeNull();
      expect(middlename).not.toBeNull();
      expect(surname).not.toBeNull();
      expect(birthdate).not.toBeNull();
      expect(position).not.toBeNull();
      expect(gender).not.toBeNull();
      expect(office).not.toBeNull();
      expect(username).not.toBeNull();
      expect(language).not.toBeNull();
      expect(password).not.toBeNull();
      expect(confirmPassword).not.toBeNull();

      let btnCancel = registerFixture.debugElement.query(By.css('.btn-cancel'));
      let btnRegister = registerFixture.debugElement.query(By.css('.btn-register'));
      expect(btnCancel).not.toBeNull();
      expect(btnCancel).not.toBeNull();
      expect(btnRegister).not.toBeNull();
    });
  });

  it(`when form inputs is valid`, () => {
    registerComp.registerForm.controls['firstName'].setValue('assaf');
    registerComp.registerForm.controls['lastName'].setValue('gafni');
    registerComp.registerForm.controls['position'].setValue('CEO');
    registerComp.registerForm.controls['gender'].setValue('female');
    registerComp.registerForm.controls['office'].setValue('cebu');
    registerComp.registerForm.controls['username'].setValue('rfuertes@gmail.com');
    registerComp.registerForm.controls['password'].setValue('p@55w0rd');
    registerComp.registerForm.controls['rePassword'].setValue('p@55w0rd');

    expect(registerComp.registerForm.valid).toBeTruthy();
  });

  it(`when form inputs is invalid`, () => {
    registerComp.registerForm.controls['firstName'].setValue('');
    registerComp.registerForm.controls['lastName'].setValue('');
    registerComp.registerForm.controls['position'].setValue('');
    registerComp.registerForm.controls['gender'].setValue('');
    registerComp.registerForm.controls['office'].setValue('');
    registerComp.registerForm.controls['username'].setValue('');
    registerComp.registerForm.controls['password'].setValue('');
    registerComp.registerForm.controls['rePassword'].setValue('');

    expect(registerComp.registerForm.valid).toBeFalsy();
  });

  it(`should call onSubmit function`, () => {
    spyOn(registerComp, 'onSubmit');
    let btnSubmit = registerFixture.debugElement.query(By.css('.btn-register')).nativeElement;
    btnSubmit.click();

    registerFixture.whenStable().then(() => {
      expect(registerComp.onSubmit).toHaveBeenCalled();
    });
  });

});
