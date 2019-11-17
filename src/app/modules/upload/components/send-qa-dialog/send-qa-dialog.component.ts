import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QAs } from '../../models/upload.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-qa-dialog',
  templateUrl: './send-qa-dialog.component.html',
  styleUrls: ['./send-qa-dialog.component.scss']
})
export class SendQaDialogComponent implements OnInit {
  public sendQAForm: FormGroup;
  private qAId: number;
  public hasError = false;

  constructor(private dialogRef: MatDialogRef<SendQaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public qAs: QAs,
              private formBuilder: FormBuilder) {

    this.sendQAForm = this.formBuilder.group({
      qAId: [null, Validators.compose([Validators.required])],
      note: [null]
    });
  }

  ngOnInit() {}

  public handleSelectQAChange(event: any) {
    this.qAId = event.value.key;
    if (this.qAId) {
      this.hasError = false;
      this.sendQAForm.get('qAId').patchValue(this.qAId);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public onSend(): void {
    const sendQAForm = this.sendQAForm.valid;
    if (sendQAForm) {
      this.dialogRef.close({qAid: this.sendQAForm.value.qAId, note: this.sendQAForm.value.note});
    } else {
      this.hasError = true;
    }
  }

}
