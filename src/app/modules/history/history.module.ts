import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from './services/history.service';
import { HistoryRoutingModule } from './history-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HistoryReducer } from './store/reducers/history.reducer';
import { HistoryEffects } from './store/effects/history.effect';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/share.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    HistoryRoutingModule,
    StoreModule.forFeature('history', HistoryReducer),
    EffectsModule.forFeature([HistoryEffects]),
    
  ],
  exports: [],
  providers: [
    HistoryService
  ],
})
export class HistoryModule { }
