import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/http-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer, metaReducers } from './store/reducers/app.reducer';
import { AppEffects } from './store/effects/app.effect';
import { AuthGuard } from './services/auth.guard';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpLoaderService } from './services/http-loader.service';
import { MessageService } from 'primeng/api';
import { SharedModule } from './shared/share.module';
import { AuthService } from './modules/auth/services/auth.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { IsLoggedInGuard} from './guards/is-logged-in.guard';

const materialModules = [
  MatProgressSpinnerModule,
  MatProgressBarModule
];

const primeNgModules = [];

export const Guards = [ IsLoggedInGuard ];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    ...materialModules,
    ...primeNgModules,
    TranslateModule.forRoot(),
    StoreModule.forRoot({ app: AppReducer }, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    AppRoutingModule
  ],
  providers: [
    ...Guards,
    AuthGuard,
    AuthService,
    HttpLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
