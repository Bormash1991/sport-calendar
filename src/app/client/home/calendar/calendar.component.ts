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
  events: any[] = [];
  eventsSubj!: Subscription;
  ngOnInit(): void {
    this.eventsSubj = this.dateService
      .getDate()
      .pipe(switchMap((date) => this.eventService.getEventsFormDb(date)))
      .subscribe((events: any) => {
        this.events = [];
        if (events) {
          this.transfromEvents(events);
        }
      });
  }
  ngOnDestroy(): void {
    this.eventsSubj.unsubscribe();
  }
  transfromEvents(events: any[]) {
    for (const [key, value] of Object.entries(events)) {
      if (
        this.dateService.getAccurateComparedTime(key) &&
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
