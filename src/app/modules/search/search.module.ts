import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import {SharedModule} from '../../shared/share.module';
import {StoreModule} from '@ngrx/store';
import {SearchReducers, metaReducers} from './store/reducers/search.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './store/effects/search.effect';
import {SearchService} from './services/search.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('search', SearchReducers, { metaReducers }),
    EffectsModule.forFeature([SearchEffects]),
    CommonModule,
    FlexLayoutModule,
    SearchRoutingModule
  ],
  exports: [],
  providers: [SearchService],
})
export class SearchModule { }
