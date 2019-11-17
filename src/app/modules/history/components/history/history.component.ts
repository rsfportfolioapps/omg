import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { History, HistoryData, FilterData, Tags, Languages, Categories } from '../../models/history.model';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input()
  public historyData: History;
  @Input()
  public loadHistoryData: Subject<History>;
  @Output()
  public loadHistoryEmitter = new EventEmitter<any>();
  @Output()
  public deleteHistoryEmitter = new EventEmitter<any>();
  public loadDataTable$ = new Subject<any>();

  public historyListData: HistoryData[] = [];
  public filterData: FilterData;
  public selected: any;

  // data table
  public dataSource: MatTableDataSource<HistoryData>;
  public styles = {
    'min-height.px': '651'
  };

  //filters
  private dateFrom: any = null;
  private dateTo: any = null;
  private searchName: any = '';
  private categoryIds: number[] = [];
  private languageIds: number[] = [];
  private tagsIds: number[] = [];

  private selectedCategoryItems: Categories[] = [];
  private selectedLanguageItems: Languages[] = [];
  private selectedTagItems: Tags[] = [];

  private resetSelect$ = new Subject<void>();
  public isShowShareModal: boolean;
  @ViewChild('inputDateRange', { static: false }) inputDateRange: ElementRef;
  @ViewChild('inputSearchName', { static: false }) inputSearchName: ElementRef;

  public columnsHeader = [
    { name: 'uploadDate', display: 'Date Upload', size: 15 },
    { name: 'name', display: 'Name', size: 35 },
    { name: 'category', display: 'Category', size: 15  },
    { name: 'language', display: 'Language', size: 15 },
    { name: 'tags', display: 'Tags', size: 20 },
    { name: 'actions', display: 'Actions', size: 10 }
  ];

  constructor() {}

  ngOnInit() {
    if (this.loadHistoryData) {
      this.loadHistoryData.subscribe((history) => {
        if (history) {
          this.fillHistoryData(history);
        }
      });
    }
  }

  private fillHistoryData(history: History) {
    this.historyData  = history;
    this.historyListData = this.historyData.model;
    this.filterData = this.historyData.filterData;
    this.dataSource = new MatTableDataSource(this.historyListData.slice());

    this.loadDataTable$.next(this.historyListData);
  }

  public onDeleteHistoryItem(resourceId: number) {
    const model = this.historyData.model.filter(function (modelItem) {
      return modelItem.resourceId !== resourceId;
    });

    const payload: History = {
      filter: this.historyData.filter,
      filterData: this.historyData.filterData,
      model: model
    };

    this.deleteHistoryEmitter.emit({history: payload, resourceId: resourceId});
  }

  public onDateChange(event: any): void {
    if (event.startDate) {
      this.dateFrom = event.startDate._d;
      this.dateTo = event.endDate._d;
      this.loadHistory();
    }
  }

  public onSearchName(name: string): void {
    this.searchName = name;
    this.filterDataSource();
  }

  public onSelectCategoryChange(event: any): void {
    this.selectedCategoryItems = event;
    this.categoryIds = [];
    this.selectedCategoryItems.forEach(tag => {
      this.categoryIds.push(tag.key);
    });
    this.filterDataSource();
  }

  public onSelectLanguageChange(event: any): void {
    this.selectedLanguageItems = event;
    this.languageIds = [];
    this.selectedLanguageItems.forEach(tag => {
      this.languageIds.push(tag.key);
    });
    this.filterDataSource();
  }

  public onSelectTagChange(event: any): void {
    this.selectedTagItems = event;
    this.tagsIds = [];
    this.selectedTagItems.forEach(tag => {
      this.tagsIds.push(tag.key);
    });
    this.filterDataSource();
  }

  public onResetFilter() {
    this.resetSelect$.next();
    this.dateFrom = null;
    this.dateTo = null;
    this.searchName = '';
    this.inputDateRange.nativeElement.value = '';
    this.inputSearchName.nativeElement.value = '';

    this.loadHistory();
  }

  private filterDataSource() {
    this.dataSource.data = this.historyListData.filter(data => {
      let categoryFilter = false;
      if (this.selectedCategoryItems && this.selectedCategoryItems.length > 0) {
        this.selectedCategoryItems.forEach(category => {
          if (data.category === category.value) {
            categoryFilter = true;
          }
        });
      } else {
        categoryFilter = true;
      }

      let languageFilter = false;
      if (this.selectedLanguageItems && this.selectedLanguageItems.length > 0) {
        this.selectedLanguageItems.forEach(language => {
          if (data.language === language.value) {
            languageFilter = true;
          }
        });
      } else {
        languageFilter = true;
      }

      let tagFilter = false;
      if (this.selectedTagItems && this.selectedTagItems.length > 0) {
        this.selectedTagItems.forEach(category => {
          if (data.tags.includes(category.value)) {
            tagFilter = true;
          }
        });
      } else {
        tagFilter = true;
      }

      let nameFilter = false;
      if (this.searchName.trim() !== '') {
        if (data.fileName.toLowerCase().includes(this.searchName.trim())) {
          nameFilter = true;
        }
      } else {
        nameFilter = true;
      }

      return categoryFilter && languageFilter && tagFilter && nameFilter;
    });

    this.loadDataTable$.next(this.dataSource.data);
  }

  private loadHistory(): void {
    const payload: any = {
      filter: {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        name: this.searchName,
        languages: this.languageIds,
        tags: this.tagsIds,
        statuses: [],
        assignedTo: [],
        categories: this.categoryIds
      },
      page: {
        min: 0,
        max: 100
      }
    };
    this.loadHistoryEmitter.emit(payload);
  }
}
