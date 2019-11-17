import { Component, OnInit } from '@angular/core';
import {ToastMessage} from '../../../../models/toast.model';
import {Subject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import { UserInfo } from 'src/app/modules/auth/models/auth.model';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '../../store/reducers/profile.reducer';
import { profileSelector } from '../../store/selectors/profile.selector';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public profileImage$: Observable<string>;

  public toastTrigger$ = new Subject<ToastMessage>();
  public styles = {
    'padding': '84px 20px 24px 20px',
    'max-width.px': '750',
  };

  constructor(
    private route: Router,
    private store: Store<ProfileState>
  ) {
    this.store.pipe(select(profileSelector)).subscribe((res: any) => {
      if (res) {
        this.profileImage$ = of(res.model.profilePicture.absoluteUri);
      }
    });
  }

  ngOnInit() {
  }

  changePassword() {
    let toast = {} as ToastMessage;
    toast.severity = 'success';
    toast.summary = 'Success';
    toast.detail = `You have successfully change your password.`;
    this.toastTrigger$.next(toast);
    setTimeout(() => {
      this.route.navigateByUrl('profile');
    }, 2500);
  }
}
