import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/effects/profile.effect';
import { ProfileReducer, metaReducers } from './store/reducers/profile.reducer';
import { ProfileService } from './services/profile.service';
import { MessageService } from 'primeng/api';
import { PasswordComponent } from './components/password/password.component';
import { SharedModule } from '../../shared/share.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const primengModules = [ToastModule, MessagesModule];
@NgModule({
  declarations: [ProfileComponent, PasswordComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('profile', ProfileReducer, { metaReducers }),
    EffectsModule.forFeature([ProfileEffects]),
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: [ProfileService, MessageService],
})
export class ProfileModule { }
