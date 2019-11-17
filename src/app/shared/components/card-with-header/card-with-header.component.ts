import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-with-header',
  templateUrl: './card-with-header.component.html',
  styleUrls: ['./card-with-header.component.scss']
})
export class CardWithHeaderComponent {

  // tslint:disable-next-line: no-input-rename
  @Input('sidebar-title')
  public sidebarTitle: string;

}
