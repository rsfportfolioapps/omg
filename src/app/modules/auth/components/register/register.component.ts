import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { emailRegex } from 'src/app/shared/validators/email.validator';
import { PasswordValidation } from 'src/app/shared/validators/password.validator';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../store/reducers/auth.reducer';
import { LoadRegister, Register } from '../../store/actions/auth.action';
import { AuthService } from '../../services/auth.service';
import { Skills, UserInfo, Gender, RegisterCollection } from '../../models/auth.model';
import { Observable, Subject } from 'rxjs';
import { registerCollectionSelector, isRegisterSelector } from '../../store/selectors/auth.selector';
import { Router } from '@angular/router';
import { ToastMessage } from 'src/app/models/toast.model';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {defaultFormat as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

export const dateFormat = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: dateFormat}]
})

export class RegisterComponent implements OnInit {
  private uploadedImage: File = null;
  private selectedSkills: number[];

  public registerForm: FormGroup;
  public imageDisplayUrl: string;
  public skillsItem: Skills[] = [];
  public genderFiltered: Gender[] = [];
  public register$: Observable<RegisterCollection>;
  public isRegistered$: Observable<boolean>;
  public toastTrigger$ = new Subject<ToastMessage>();
  public maxMsgValidation: string;
  

  constructor(private loginService: AuthService, private store: Store<AuthState>, private formBuilder: FormBuilder, private route: Router) {
    this.register$ = this.store.pipe(select(registerCollectionSelector));
    this.register$.subscribe((res) => {
      if (res) {
        this.genderFiltered = res.genders.filter(function (item) { return item.key > 0; });
      }
    });
    this.isRegistered$ = this.store.pipe(select(isRegisterSelector));

    this.store.dispatch(new LoadRegister());
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required])],
      middleName: [null],
      lastName: [null, Validators.compose([Validators.required])],
      birthDate: [null],
      position: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
      office: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      language: [null],
      skills: [null],
      password: [null, Validators.compose([Validators.required])],
      rePassword: [null, Validators.compose([Validators.required])]
    }, {
        validators: PasswordValidation.MatchPassword
      }
    );
  }

  ngOnInit(): void {
    this.isRegistered$.subscribe((res) => {
      if (res) {
        let toast = {} as ToastMessage;
        toast.severity = 'success';
        toast.summary = 'Success';
        toast.detail = `You have successfully registered.`;
        this.toastTrigger$.next(toast);
        setTimeout(() => {
          this.route.navigateByUrl('login');
        }, 3500);
      }
    });
  }

  public handleImageChange(event: File): void {
    this.uploadedImage = event;
  }

  public handleSelectChange(event: any): void {
    this.skillsItem = event.value;
    this.selectedSkills = [];
    this.skillsItem.forEach(skill => {
      this.selectedSkills.push(skill.key);
      this.registerForm.get('skills').patchValue(this.selectedSkills);
    });
  }

  public haddleMaxCharEvent(msg: string): void {
    if (msg) {
      this.maxMsgValidation = msg;
    }
  }

  public onSubmit() {
    if (this.uploadedImage) {
      const formData = new FormData();
      formData.append('file', this.uploadedImage, this.uploadedImage.name);
      this.uploadImage(formData, this.register);
    } else {
      this.register();
    }
  }

  private register = (fileId?: string) => {
    const payload: UserInfo = {
      firstName: this.registerForm.value.firstName,
      middleName: this.registerForm.value.middleName,
      lastName: this.registerForm.value.lastName,
      birthDate: this.registerForm.value.birthDate,
      hiringDate: '2019-07-22T15:24:15.568Z',
      positionId: this.registerForm.value.position,
      gender: this.registerForm.value.gender,
      officeId: this.registerForm.value.office,
      email: this.registerForm.value.email,
      fileStorageId: fileId,
      languageId:  this.registerForm.value.language,
      skillIds: this.selectedSkills,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.rePassword,
    };

    this.store.dispatch(new Register(payload));
  }

  private uploadImage(formData: any, callback: any) {
    this.loginService.uploadImage(formData).subscribe((response: any) => {
      callback(response);
    });
  }
}
