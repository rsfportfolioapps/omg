import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendQaDialogComponent } from './send-qa-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownMultiSelectSearchComponent } from 'src/app/shared/components/dropdown-multi-select-search/dropdown-multi-select-search.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SendQaDialogComponent', () => {

  let component: SendQaDialogComponent;
  let fixture: ComponentFixture<SendQaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendQaDialogComponent, DropdownMultiSelectSearchComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendQaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SendQaDialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
