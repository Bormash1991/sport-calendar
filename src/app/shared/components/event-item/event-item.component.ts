import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { EventService } from '../../services/event.service';
import { switchMap, take } from 'rxjs';
import { EventMoreModalComponent } from '../event-more-modal/event-more-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserEvent } from 'src/app/models/event.interface';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  @Input() event!: [string, UserEvent];
  @Input() classForText: string = '';
  doneClass = '';
  constructor(
    private dateService: DateService,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (this.event[1].done) {
      this.doneClass = 'done';
    }
  }
  delete(time: string) {
    this.dateService
      .getDate()
      .pipe(
        take(1),
        switchMap((date) => this.eventService.deleteEvent(date, time))
      )
      .subscribe();
  }
  markDone(time: string) {
    this.dateService
      .getDate()
      .pipe(
        take(1),
        switchMap((date) => this.eventService.markDone(date, time))
      )
      .subscribe();
  }
  markNotDone(time: string) {
    this.dateService
      .getDate()
      .pipe(
        take(1),
        switchMap((date) => this.eventService.markNotDone(date, time))
      )
      .subscribe();
  }
  openMoreModal() {
    this.dialog.open(EventMoreModalComponent, {
      data: {
        event: this.event,
      },
    });
  }
}
