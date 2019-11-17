import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MatSelect, MatOption } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Tags } from 'src/app/modules/home/models/home.model';
import { Tag } from 'src/app/models/upload.model';

@Component({
  selector: 'app-dropdown-multi-select-search',
  templateUrl: './dropdown-multi-select-search.component.html',
  styleUrls: ['./dropdown-multi-select-search.component.scss']
})
export class DropdownMultiSelectSearchComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input()
  public dataList: any[] = [];
  @Input()
  public placeHolder = '';
  @Input()
  public multiSelectDropdown = false;
  @Input()
  public searchItem = false;
  @Input()
  public clearOption: Observable<void>;
  @Input()
  public defaultValue: any;
  @Input()
  public isRequired = false;
  @Input()
  public selectedItems: any[] = [];
  @Output()
  public selectedItemEmitted = new EventEmitter<any>();

  @ViewChild('multiSelect', { static: true })
  public matSelect: MatSelect;

  public dataFilterForm: FormControl = new FormControl();
  public form: FormGroup;
  public filteredData: ReplaySubject<any> = new ReplaySubject<any>();
  public _onDestroy = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      seletedTags: [null]
    });
  }

  ngOnInit(): void {
    if (this.dataList) {
      this.filteredData.next(this.dataList.slice());
    }

    this.dataFilterForm.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdata();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if the records are changes, then get the recent values
    if (changes.dataList) {
      const currValue: any[] = changes.dataList.currentValue;
      const prevValue: any[] = changes.dataList.previousValue;
      if (currValue && prevValue && (currValue.length !== prevValue.length)) {
        this.dataList = currValue;
        this.filterdata();
      }
    }

    if (changes.selectedItems) {
      const currValue: any[] = changes.selectedItems.currentValue || null;
      const prevValue: any[] = changes.selectedItems.previousValue || null;
      if (currValue !== prevValue) {
        setTimeout(() => {
          currValue.forEach((selectedTag: Tag) => {
            this.matSelect.options.forEach((option: MatOption) => {
              const tag: Tag = option.value;
              if (tag && selectedTag.value === tag.value) {
                option.select();
              }
            });
          });
        });
      }
    }
  }

  ngAfterViewInit() { }

  private filterdata(): void {
    if (!this.dataList) return;
    let search = this.dataFilterForm.value;
    if (!search) {
      this.filteredData.next(this.dataList.slice());
      return;
    } else {
      //perform search
      this.filteredData.next(this.dataList.filter(data => data.value.toLowerCase().indexOf(search.toLowerCase()) > -1));
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public onSelect(event: any): void {
    this.selectedItemEmitted.emit(event);
  }

}
