import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-event-more-modal',
  templateUrl: './event-more-modal.component.html',
  styleUrls: ['./event-more-modal.component.scss'],
})
export class EventMoreModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EventMoreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateService: DateService
  ) {}

  close() {
    console.log(this.data);
    this.dialogRef.close();
  }
}
