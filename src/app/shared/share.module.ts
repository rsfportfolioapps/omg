import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DialogModule } from 'primeng/dialog';
import { RibbonTitleComponent } from './components/ribbon-title/ribbon-title.component';
import { DropdownMultiSelectSearchComponent } from './components/dropdown-multi-select-search/dropdown-multi-select-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaxLengthDirective } from './directives/max-length.directive';
import { DragDropDirective } from './directives/drag-drop.directive';
import { TooltipModule } from 'primeng/tooltip';
import { EnlargeImageComponent } from './components/enlarge-image/enlarge-image.component';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CopyClipboardDirective } from './directives/copy-to-clipboard.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareDialogComponent } from '../modules/history/components/share-dialog/share-dialog.component';
import { ConfirmDialogComponent } from '../modules/history/components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { CardWithHeaderComponent } from './components/card-with-header/card-with-header.component';

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
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatRadioModule,
  MatTooltipModule,
} from '@angular/material';
import { ShareLinkDialogComponent } from './components/share-link-dialog/share-link-dialog.component';

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
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatRadioModule,
  NgxMatSelectSearchModule,
  MatTooltipModule,
];

const primengModules = [
  TooltipModule,
  DialogModule
];

export const entryComponents = [
  ShareDialogComponent,
  ConfirmDialogComponent
];

export const exportComponents = [
  ImageUploadComponent,
  RibbonTitleComponent,
  DropdownMultiSelectSearchComponent,
  EnlargeImageComponent,
  MaxLengthDirective,
  DragDropDirective,
  CopyClipboardDirective,
  ToastComponent,
  DataTableComponent,
  HeaderComponent,
  CardComponent,
  CardWithHeaderComponent,
  ShareLinkDialogComponent
];

export const components = [
  ...exportComponents,
  ...entryComponents
];

@NgModule({
  declarations: [
    ...components    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMatSelectSearchModule,
    ImageCropperModule,
    ToastModule,
    FlexLayoutModule,
    ...materialModules,
    ...primengModules
  ],
  entryComponents: [
    ...entryComponents
  ],
  exports: [
    ...exportComponents,
    ...materialModules
  ],
  providers: [],
})
export class SharedModule { }
