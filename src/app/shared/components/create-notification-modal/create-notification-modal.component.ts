import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-create-notification-modal',
  templateUrl: './create-notification-modal.component.html',
  styleUrls: ['./create-notification-modal.component.scss'],
})
export class CreateNotificationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateNotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateService: DateService
  ) {}
}
