import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Inbox, InboxData, FilterData, Tags, Languages, Categories, Status } from '../../models/inbox.model';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  @Input()
  public inboxData: Inbox;
  @Input()
  public loadInboxData: Subject<Inbox>;
  @Input()
  public isSearch: boolean;
  @Output()
  public loadInboxEmitter = new EventEmitter<any>();
  @Output()
  public deleteInboxEmitter = new EventEmitter<any>();
  public loadDataTable$ = new Subject<any>();

  public inboxListData: InboxData[] = [];
  public filterData: FilterData;
  public selected: any;

  // data table
  public dataSource: MatTableDataSource<InboxData>;
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
  private statusIds: number[] = [];
  private priorityIds: number[] = [];

  private selectedCategoryItems: Categories[] = [];
  private selectedLanguageItems: Languages[] = [];
  private selectedTagItems: Tags[] = [];
  private selectedStatusItems: Status[] = [];
  private selectedPriorityItems = [];

  private resetSelect$ = new Subject<void>();
  public isShowShareModal: boolean;
  @ViewChild('inputDateRange', { static: false }) inputDateRange: ElementRef;
  @ViewChild('inputSearchName', { static: false }) inputSearchName: ElementRef;

  public columnsHeader = [
    { name: 'uploadDate', display: 'Date Uploaded', size: 10 },
    { name: 'name', display: 'Name', size: 35 },
    { name: 'category', display: 'Category', size: 15  },
    { name: 'language', display: 'Language', size: 15 },
    { name: 'status', display: 'Status', size: 10 },
    { name: 'priority', display: 'Priority', size: 10 },
    { name: 'actions', display: 'Actions', size: 10 }
  ];

  constructor() {}

  ngOnInit() {
    if (this.loadInboxData) {
      this.loadInboxData.subscribe((inbox) => {
        if (inbox) {
          this.fillInboxData(inbox);
        }
      });
    }
  }

  private fillInboxData(inbox: Inbox) {
    this.inboxData  = inbox;
    this.inboxListData = this.inboxData.model;
    this.filterData = this.inboxData.filterData;
    this.dataSource = new MatTableDataSource(this.inboxListData.slice());
    this.loadDataTable$.next(this.inboxListData);
  }

  public onDeleteInboxItem(resourceId: number) {
    const model = this.inboxData.model.filter(function (modelItem) {
      return modelItem.resourceId !== resourceId;
    });

    const payload: Inbox = {
      filter: this.inboxData.filter,
      filterData: this.inboxData.filterData,
      model: model
    };

    this.deleteInboxEmitter.emit({inbox: payload, resourceId: resourceId});
  }

  public onDateChange(event: any): void {
    if (event.startDate) {
      this.dateFrom = event.startDate._d;
      this.dateTo = event.endDate._d;
      this.loadInbox();
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

  public onSelectStatusChange(event: any): void {
    this.selectedStatusItems = event;
    this.statusIds = [];
    this.selectedStatusItems.forEach(status => {
      this.statusIds.push(status.key);
    });
    this.filterDataSource();
  }

  public onSelectPriorityChange(event: any): void {
    this.selectedPriorityItems = event;
    this.priorityIds = [];
    this.selectedPriorityItems.forEach(priority => {
      this.priorityIds.push(priority.key);
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

    this.loadInbox();
  }

  private filterDataSource() {
    this.dataSource.data = this.inboxListData.filter(data => {
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

      let statusFilter = false;
      if (this.selectedStatusItems && this.selectedStatusItems.length > 0) {
        this.selectedStatusItems.forEach(status => {
          if (data.status === status.value) {
            statusFilter = true;
          }
        });
      } else {
        statusFilter = true;
      }

      let priorityFilter = false;
      if (this.selectedPriorityItems && this.selectedPriorityItems.length > 0) {
        this.selectedPriorityItems.forEach(priority => {
          if (data.priority === priority.value) {
            priorityFilter = true;
          }
        });
      } else {
        priorityFilter = true;
      }

      let nameFilter = false;
      if (this.searchName.trim() !== '') {
        if (data.fileName.toLowerCase().includes(this.searchName.trim())) {
          nameFilter = true;
        }
      } else {
        nameFilter = true;
      }

      return categoryFilter && languageFilter && tagFilter && statusFilter && priorityFilter && nameFilter;
    });

    this.loadDataTable$.next(this.dataSource.data);
  }

  private loadInbox(): void {
    const payload: any = {
      filter: {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        name: this.searchName,
        languages: this.languageIds,
        tags: this.tagsIds,
        statuses: this.statusIds,
        priorities: this.priorityIds,
        assignedTo: [],
        categories: this.categoryIds
      },
      page: {
        min: 0,
        max: 100
      }
    };
    this.loadInboxEmitter.emit(payload);
  }
}
