import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileContainerComponent } from './containers/profile-container.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/share.module';
import { MessagesModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../auth/services/auth.service';
import { MessageService } from 'primeng/api';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatError,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { metaReducers, ProfileReducer } from './store/reducers/profile.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/effects/profile.effect';
import { PasswordComponent } from './components/password/password.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileContainerComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'edit', component: ProfileEditComponent },
      { path: 'password', component: PasswordComponent },
    ]
  }
];

const primengModules = [ToastModule, MessagesModule];

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
];

@NgModule({
  declarations: [
    ProfileEditComponent,
    ProfileContainerComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    ...primengModules,
    ...materialModules,
    FlexLayoutModule,
    SharedModule,
    RouterModule.forChild(routes),
    ToastModule,
    StoreModule.forFeature('profile', ProfileReducer, { metaReducers }),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [RouterModule],
  providers: [AuthService, MessageService],
})
export class ProfileRoutingModule { }
