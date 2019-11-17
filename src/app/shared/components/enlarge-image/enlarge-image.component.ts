import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-enlarge-image',
  templateUrl: './enlarge-image.component.html',
  styleUrls: ['./enlarge-image.component.scss']
})
export class EnlargeImageComponent implements OnInit {

  @Input()
  public showModal: boolean;

  @Input()
  public imageData: any;

  @Output()
  public showModalEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public toggleModal(): void {
    this.showModal = !this.showModal;
    this.showModalEmitter.emit(this.showModal);
  }

}
