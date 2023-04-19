import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateService } from '../../services/date.service';
import { UserEvent } from 'src/app/models/event.interface';

@Component({
  selector: 'app-event-more-modal',
  templateUrl: './event-more-modal.component.html',
  styleUrls: ['./event-more-modal.component.scss'],
})
export class EventMoreModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EventMoreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: [string, UserEvent] }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
