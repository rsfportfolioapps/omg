import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpLoaderService } from './services/http-loader.service';
import { StoreModule } from '@ngrx/store';
import { AppReducer, metaReducers } from './store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effect';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AppRoutingModule,
        StoreModule.forRoot({ app: AppReducer }, { metaReducers }),
        EffectsModule.forRoot([AppEffects])
      ],
      providers: [HttpLoaderService]
    }).compileComponents();
  }));

  it(`should exist`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
  });
});
