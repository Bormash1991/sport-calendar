import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
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
      this.events.push([key, value]);
    }
  }
}
