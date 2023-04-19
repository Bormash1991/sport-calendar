import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifItem } from 'src/app/models/notif-item.interface';

@Component({
  selector: 'app-notif-more-modal',
  templateUrl: './notif-more-modal.component.html',
  styleUrls: ['./notif-more-modal.component.scss'],
})
export class NotifMoreModalComponent {
  constructor(
    public dialogRef: MatDialogRef<NotifMoreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: [string, NotifItem] }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
