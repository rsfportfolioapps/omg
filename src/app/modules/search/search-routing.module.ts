import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './components/search/search.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SharedModule} from '../../shared/share.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SearchReducers, metaReducers} from './store/reducers/search.reducer';
import {SearchEffects} from './store/effects/search.effect';
import { FlexLayoutModule } from '@angular/flex-layout';



const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'results', component: SearchComponent },
];


@NgModule({
  declarations: [
    SearchComponent, SearchResultsComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxDaterangepickerMd.forRoot(),

    StoreModule.forFeature('search', SearchReducers, { metaReducers }),
    EffectsModule.forFeature([SearchEffects]),
  ],
  exports: [RouterModule],
})
export class SearchRoutingModule { }
