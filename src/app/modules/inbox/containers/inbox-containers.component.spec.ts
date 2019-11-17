import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxContainersComponent } from './inbox-containers.component';

describe('InboxContainersComponent', () => {
  let component: InboxContainersComponent;
  let fixture: ComponentFixture<InboxContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
