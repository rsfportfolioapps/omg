import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxService } from './services/inbox.service';
import { InboxRoutingModule } from './inbox-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InboxReducer } from './store/reducers/inbox.reducer';
import { InboxEffects } from './store/effects/inbox.effect';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/share.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    InboxRoutingModule,
    StoreModule.forFeature('inbox', InboxReducer),
    EffectsModule.forFeature([InboxEffects]),

  ],
  exports: [],
  providers: [
    InboxService
  ],
})
export class InboxModule { }
