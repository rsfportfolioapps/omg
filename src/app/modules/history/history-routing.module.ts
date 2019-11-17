import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HistoryContainersComponent } from './containers/history-containers.component';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';


const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatProgressBarModule
];

export const routes: Routes = [
  { path: '', component: HistoryContainersComponent },
];

@NgModule({
  declarations: [
    HistoryComponent,
    HistoryContainersComponent
  ],
  imports: [
    ...materialModules,
    FlexLayoutModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxDaterangepickerMd.forRoot()
  ],
  exports: [
    RouterModule,
    HistoryComponent
  ]
})

export class HistoryRoutingModule { }
