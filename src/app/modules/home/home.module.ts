import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './services/home.service';
import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeReducer } from './store/reducers/home.reducer';
import { HomeEffects } from './store/effects/home.effect';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/share.module';

const materialModules = [
  MatButtonModule,
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    HomeRoutingModule,
    ...materialModules,
    StoreModule.forFeature('home', HomeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  exports: [],
  providers: [
    HomeService
  ],
})
export class HomeModule { }
