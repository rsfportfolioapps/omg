import { Component, OnInit } from '@angular/core';

enum RoleType {
  LEAD = 'Lead',
  DESIGNER = 'Designer'
}
@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent implements OnInit {

  public role: string;

  constructor() { }

  ngOnInit(): void {
    this.role = RoleType.LEAD;
  }
}
