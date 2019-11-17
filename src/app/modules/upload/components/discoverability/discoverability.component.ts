import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Tag } from 'src/app/models/upload.model';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { DropdownMultiSelectSearchComponent } from 'src/app/shared/components/dropdown-multi-select-search/dropdown-multi-select-search.component';
import { UploadState, getDataTags } from '../../store/reducers/upload.reducer';
import { AddTagAction } from '../../store/actions/upload.action';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDataTagsSelector, getModelTagsSelector } from '../../store/selectors/upload.selector';

@Component({
  selector: 'app-discoverability',
  templateUrl: './discoverability.component.html',
  styleUrls: ['./discoverability.component.scss']
})
export class DiscoverabilityComponent implements OnInit {
  @Input()
  public form: FormGroup;
  @Output()
  public changeEmitter = new EventEmitter<Tag[]>();

  public selectedItems: Tag[] = [];
  public tags$: Observable<Tag[]>;
  public isLoading: boolean = false;
  public selectedItem: string;
  public tags: Tag[];

  @ViewChild('multiSelect', { static: false }) multiSelect: DropdownMultiSelectSearchComponent;
  @ViewChild('tagInput', { static: false }) tagInput: ElementRef;

  constructor(private store: Store<UploadState>) {
    combineLatest(
      this.store.pipe(select(getDataTagsSelector)),
      this.store.pipe(select(getModelTagsSelector))
    ).pipe(map(([data, model]) => {
      if (data) this.tags = data;
      if (model) this.selectedItems = [{ key: 1, value: "123" }, { key: 2, value: "Skull" }]; //temporary data

      //NOTE: wrong value sent via api response on model
      const selected: Tag[] = _.filter(this.tags, (t: Tag[]) => _.includes(t, this.selectedItem));
      if (selected && selected.length > 0)
        this.selectedItems = this.selectedItems.concat(...selected);

      this.isLoading = !this.isLoading;
    })).subscribe()
  }

  ngOnInit(): void { }

  public onSelectTagChange(tag: Tag[]): void {
    this.selectedItems = tag;
  }

  public onRemoveTag(tag: Tag): void {
    this.selectedItems = _.remove(this.selectedItems, (currTag) => currTag.value !== tag.value);
    this.multiSelect.form.get('seletedTags').patchValue([...this.selectedItems]);
  }

  public AddTag(value: string): void {
    this.isLoading = !this.isLoading;
    this.tagInput.nativeElement.value = '';
    this.store.dispatch(new AddTagAction(this.selectedItem = value));
  }
}

