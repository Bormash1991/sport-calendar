import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { UserEvent } from 'src/app/models/event.interface';
import { Events } from 'src/app/models/events.interface';
import { DateService } from 'src/app/shared/services/date.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  constructor(
    private dateService: DateService,
    private eventService: EventService
  ) {}
  events: [string, UserEvent][] = [];
  eventsSubj!: Subscription;
  ngOnInit(): void {
    this.eventsSubj = this.dateService
      .getDate()
      .pipe(switchMap((date) => this.eventService.getEventsFormDb(date)))
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
      this.events.push([key, value]);
    }
  }
}
