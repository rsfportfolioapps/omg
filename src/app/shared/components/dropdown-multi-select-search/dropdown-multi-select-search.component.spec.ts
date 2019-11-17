import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownMultiSelectSearchComponent } from './dropdown-multi-select-search.component';
import { SharedModule } from '../../share.module';

describe('DropdownMultiSelectSearchComponent', () => {
  let dropdownComp: DropdownMultiSelectSearchComponent;
  let dropdownFixture: ComponentFixture<DropdownMultiSelectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    dropdownFixture = TestBed.createComponent(DropdownMultiSelectSearchComponent);
    dropdownComp = dropdownFixture.componentInstance;
    dropdownFixture.detectChanges();
  });
});
