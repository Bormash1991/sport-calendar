import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventModalComponent } from 'src/app/shared/components/create-event-modal/create-event-modal.component';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrls: ['./choose-date.component.scss'],
})
export class ChooseDateComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(CreateEventModalComponent, {
      data: {},
    });
  }
}
