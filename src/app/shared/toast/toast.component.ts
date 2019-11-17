import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ToastMessage } from 'src/app/models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input()
  public trigger: Observable<ToastMessage>;

  public message: ToastMessage;
  private toastMsgDefaults = {
    severity: null,
    summary: null,
    detail: null,
  };
  private toastConfigDefaults = {
    key: null,
    style: null,
    styleClass: null,
    position: 'top-right',
    modal: false,
    baseZIndex: 0,
    autoZIndex: true,
    showTransitionOptions: '300ms ease-out',
    hideTransitionOptions: '250ms ease-in',
  };

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.message = {...this.toastConfigDefaults, ...this.toastMsgDefaults};
    this.trigger.subscribe((message) => {
      this.message = { ...this.toastConfigDefaults, ...message};
      const { key, severity, summary, detail } = this.message;

      this.messageService.add({ key, severity, summary, detail });
    });
  }
}
