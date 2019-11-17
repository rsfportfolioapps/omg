import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryContainersComponent } from './history-containers.component';

describe('HistoryContainersComponent', () => {
  let component: HistoryContainersComponent;
  let fixture: ComponentFixture<HistoryContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
