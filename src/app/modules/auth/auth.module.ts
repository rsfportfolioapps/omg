import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthReducer, metaReducers } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effect';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedModule } from '../../shared/share.module';
import { IsAlreadyLoggedInGuard } from '../../guards/is-already-logged-in.guard';

const primengModules = [ToastModule, MessagesModule];
export const Guards = [ IsAlreadyLoggedInGuard ];
@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    SharedModule,
    ...primengModules,
    StoreModule.forFeature('auth', AuthReducer, { metaReducers }),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [],
  providers: [AuthService, MessageService, ...Guards],
})
export class AuthModule { }
