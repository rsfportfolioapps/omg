import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from './containers/home-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './components/upload/upload.component';
import { UploadDetailNewComponent } from './components/upload-detail-new/upload-detail-new.component';
import { SharedModule } from 'src/app/shared/share.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendQaDialogComponent } from './components/send-qa-dialog/send-qa-dialog.component';
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
      // { path: 'upload', component: UploadComponent },
      // { path: 'upload-detail-new', component: UploadDetailNewComponent },
      // {
      //   path: '**',
      //   redirectTo: 'upload',
      //   pathMatch: 'full'
      // },
    ],
  },
];

@NgModule({
  declarations: [
    HomeContainerComponent,
    UploadComponent,
    UploadDetailNewComponent,
    SendQaDialogComponent,
    // FullLayoutComponent,
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
  entryComponents: [SendQaDialogComponent],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule { }
