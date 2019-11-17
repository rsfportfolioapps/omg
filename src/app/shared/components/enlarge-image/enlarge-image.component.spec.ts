import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlargeImageComponent } from './enlarge-image.component';

describe('EnlargeImageComponent', () => {
  let component: EnlargeImageComponent;
  let fixture: ComponentFixture<EnlargeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlargeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlargeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
