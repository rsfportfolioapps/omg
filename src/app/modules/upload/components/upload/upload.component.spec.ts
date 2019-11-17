import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { RibbonTitleComponent } from 'src/app/shared/components/ribbon-title/ribbon-title.component';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

fdescribe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadComponent,
        RibbonTitleComponent
      ],
      imports: [
        MatCardModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UploadComponent', () => {
    expect(component).toBeTruthy();
  });
});
