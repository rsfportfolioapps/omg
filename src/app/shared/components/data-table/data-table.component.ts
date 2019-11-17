import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { ShareDialogComponent } from '../../../modules/history/components/share-dialog/share-dialog.component';
import { ConfirmDialogComponent } from '../../../modules/history/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { History, HistoryData } from '../../../modules/history/models/history.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input()
  public loadData: Subject<History>;

  @Input()
  public type: string;

  @Output()
  public deleteItemEmitter = new EventEmitter<number>();

  private dataList: HistoryData[];
  public history$: Observable<History>;
  public isShowShareDialog = [];
  public isShowImageArray = [];
  public previousShareDialog = [];
  public shareLink: string = '';

   // data table
   public dataSource: HistoryData[];
   public pageSize = 8;
   public currentPage = 0;
   public totalSize = 0;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private route: Router) { }

  ngOnInit() {
    if (this.loadData) {
      this.loadData.subscribe((data: any) => {
        if (data) {
          this.dataList = data;
          this.dataList.forEach(() => {
            this.isShowImageArray.push(false);
          });
          this.dataSource = this.dataList.slice(0, this.pageSize);
          this.totalSize =  this.dataList.length;
        }
      });
    }
  }

  public onShowImageModal(i): void {
    console.log('onShowImageModal: ', i);
    this.isShowImageArray[i] = !this.isShowImageArray[i];
  }

  public onShowShareDialog(i): void {
    let previous = this.previousShareDialog;
    if (previous[0] === i) {
      this.isShowShareDialog[i] = !this.isShowShareDialog[i];
      previous.pop();
    } else {
      if (previous.length > 0) {
        this.isShowShareDialog[previous[0]] = !this.isShowShareDialog[previous[0]];
        this.isShowShareDialog[i] = !this.isShowShareDialog[i];
        previous.pop();
      } else {
        this.isShowShareDialog[i] = !this.isShowShareDialog[i];
      }
      previous.push(i);
    }
  }

  public onPageChange(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.dataSource = this.dataList.slice(start, end);
  }

  public openShareDialog(link: string): void {
    this.dialog.open(ShareDialogComponent, {
      width: '550px',
      data: link
    });
  }

  public openConfirmDeleteDialog(fileName: string, resourceId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: fileName
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
       this.removeSelecedRow(resourceId);
      }
    });
  }

  public viewDetails(resourceId: number) {
    this.route.navigateByUrl(`/upload/upload-detail-new?resourceId=${resourceId}`);
  }

  private removeSelecedRow(resourceId: number) {
    this.deleteItemEmitter.emit(resourceId);
  }

}
