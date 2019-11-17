import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailRegex } from 'src/app/shared/validators/email.validator';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '../../store/reducers/profile.reducer';
import { AuthService } from '../../../auth/services/auth.service';
import { Skills, UserInfo, RegisterCollection } from '../../../auth/models/auth.model';
import {Observable, Subject, Subscription} from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { profileSelector, isUpdateSelector } from '../../store/selectors/profile.selector';
import { ToastMessage } from 'src/app/models/toast.model';
import { registerCollectionSelector } from '../../../auth/store/selectors/auth.selector';
import { Update } from '../../store/actions/profile.action';
import * as _moment from 'moment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit, OnDestroy {
  private uploadedImage: File = null;
  private selectedSkills: number[];
  private isUpdatedSub: Subscription;

  public profileForm: FormGroup;
  public imageDisplayUrl: string;
  public skillsItem: Skills[] = [];
  public register$: Observable<RegisterCollection>;
  public profile$: Observable<UserInfo>;
  public isUpdated$: Observable<boolean>;
  public toastTrigger$ = new Subject<ToastMessage>();
  public maxMsgValidation: string;
  public styles = {
    'padding.px': '50',
    'min-width.px': '950',
  };

  constructor(private loginService: AuthService,
    private store: Store<ProfileState>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {
    this.profileForm = this.formBuilder.group({
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
      fileStorageId: [null],
    });

    this.register$ = this.store.pipe(select(registerCollectionSelector));
    this.profile$ = this.store.pipe(select(profileSelector));
    this.profile$.subscribe((res: any) => {
      if (res) {
        const birthDateToLocal = _moment(_moment.utc(res.model.birthDate).toDate()).local().format('YYYY-MM-DDTHH:mm:ss');
        this.imageDisplayUrl = res.model.profilePicture.absoluteUri;
        this.profileForm.get('firstName').patchValue(res.model.firstName);
        this.profileForm.get('middleName').patchValue(res.model.middleName);
        this.profileForm.get('lastName').patchValue(res.model.lastName);
        this.profileForm.get('birthDate').patchValue(birthDateToLocal);
        this.profileForm.get('email').patchValue(res.model.email);
        this.profileForm.get('position').patchValue(res.model.position.key);
        this.profileForm.get('gender').patchValue(res.model.gender.key);
        this.profileForm.get('office').patchValue(res.model.office.key);
        this.profileForm.get('language').patchValue(1); // temporary
        this.profileForm.get('skills').patchValue(res.model.skills.map(s => s.id));
        this.profileForm.get('fileStorageId').patchValue(res.model.profilePicture.fileStorageId);
      }
    });
    this.isUpdated$ = this.store.pipe(select(isUpdateSelector));
  }

  ngOnInit(): void {
    this.isUpdatedSub = this.isUpdated$.subscribe((res) => {
      if (res) {
        this.openConfirmDialog();
      }
    });
  }

  ngOnDestroy(): void {
    this.isUpdatedSub.unsubscribe();
  }

  public handleImageChange(event: File): void {
    this.uploadedImage = event;
  }

  public handleSelectChange(event: any): void {
    this.skillsItem = event.value;
    this.selectedSkills = [];
    this.skillsItem.forEach(skill => {
      this.selectedSkills.push(skill.key);
      this.profileForm.get('skills').patchValue(this.selectedSkills);
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

  private openConfirmDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '480px',
    });
  }

  private register = (fileId?: string) => {
    const payload: any = {
      firstName: this.profileForm.value.firstName,
      middleName: this.profileForm.value.middleName,
      lastName: this.profileForm.value.lastName,
      birthDate: this.profileForm.value.birthDate,
      officeId: this.profileForm.value.office,
      positionId: this.profileForm.value.position,
      gender: this.profileForm.value.gender,
      email: this.profileForm.value.email,
      fileStorageKey: fileId || this.profileForm.value.fileStorageId,
      skillIds: this.profileForm.value.skills,
    };
    this.store.dispatch(new Update(payload));
  }

  private uploadImage(formData: any, callback: any) {
    this.loginService.uploadImage(formData).subscribe((response: any) => {
      callback(response);
    });
  }
}
