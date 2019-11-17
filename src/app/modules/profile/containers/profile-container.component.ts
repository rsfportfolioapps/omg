import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileState } from '../store/reducers/profile.reducer';
import { LoadRegister } from '../../auth/store/actions/auth.action';
import { LoadProfile } from '../store/actions/profile.action';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss']
})
export class ProfileContainerComponent implements OnInit {
  public role = '';

  constructor(private store: Store<ProfileState>) {
    this.store.subscribe(res => console.log(res));

    this.store.dispatch(new LoadProfile());
    this.store.dispatch(new LoadRegister());

  }

  ngOnInit(): void {
  }

  onChangeRole() {
  }
}
