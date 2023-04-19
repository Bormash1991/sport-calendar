import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { UserEvent } from 'src/app/models/event.interface';
import { Events } from 'src/app/models/events.interface';
import { DateService } from 'src/app/shared/services/date.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  constructor(
    private dateService: DateService,
    private eventService: EventService
  ) {}
  events: [string, UserEvent][] = [];
  eventsSubj!: Subscription;
  currentDate!: Date;
  ngOnInit(): void {
    this.eventsSubj = this.dateService
      .getDate()
      .pipe(
        switchMap((date) => {
          this.currentDate = date;
          return this.eventService.getEventsFormDb(date);
        })
      )
      .subscribe({
        next: (events) => {
          this.events = [];
          if (events) {
            this.transfromEvents(events);
          }
        },
        error: () => {},
      });
  }
  ngOnDestroy(): void {
    this.eventsSubj.unsubscribe();
  }
  transfromEvents(events: Events) {
    for (const [key, value] of Object.entries(events)) {
      if (
        this.dateService.getAccurateComparedTime(key, this.currentDate) &&
        this.events.length < 2
      ) {
        this.events.push([key, value]);
      }
    }
    if (!this.events.length) {
      for (const [key, value] of Object.entries(events).slice(-2)) {
        this.events.push([key, value]);
      }
    }
  }
}
