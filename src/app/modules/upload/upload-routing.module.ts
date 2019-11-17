import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadContainerComponent } from './containers/upload-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './components/upload/upload.component';
import { UploadDetailNewComponent } from './components/upload-detail-new/upload-detail-new.component';
import { SharedModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendQaDialogComponent } from './components/send-qa-dialog/send-qa-dialog.component';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
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
  MatExpansionModule
} from '@angular/material';
import { FullLayoutComponent } from '../../layouts/full/full-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AddSourceDialogComponent } from './components/add-source-dialog/add-source-dialog.component';
import { UploadNewDialogComponent } from './components/upload-new-dialog/upload-new-dialog.component';
import { DiscoverabilityComponent } from './components/discoverability/discoverability.component';

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
  MatExpansionModule
];

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UploadComponent },
      { path: 'upload-detail-new', component: UploadDetailNewComponent },
      { path: 'upload-detail-new/:id', component: UploadDetailNewComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UploadContainerComponent,
    UploadComponent,
    UploadDetailNewComponent,
    SendQaDialogComponent,
    ConfirmDialogComponent,
    SaveDialogComponent,
    AddSourceDialogComponent,
    FullLayoutComponent,
    UploadNewDialogComponent,
    DiscoverabilityComponent
  ],
  imports: [
    ...materialModules,
    FlexLayoutModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    SendQaDialogComponent,
    ConfirmDialogComponent,
    SaveDialogComponent,
    AddSourceDialogComponent,
    UploadNewDialogComponent
  ],
  exports: [
    RouterModule
  ]
})

export class UploadRoutingModule { }
