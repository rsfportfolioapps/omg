import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxComponent } from './components/inbox/inbox.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { InboxContainersComponent } from './containers/inbox-containers.component';
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
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';


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
  { path: '', component: InboxContainersComponent },
];

@NgModule({
  declarations: [
    InboxComponent,
    InboxContainersComponent,
    ConfirmDialogComponent,
    ShareDialogComponent
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
    InboxComponent
  ]
})

export class InboxRoutingModule { }
