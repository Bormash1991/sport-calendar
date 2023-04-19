import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UsersService } from './users.service';
import { DateService } from './date.service';
import { switchMap, throwError } from 'rxjs';
import { Events } from 'src/app/models/events.interface';
import { UserEvent } from 'src/app/models/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private db: AngularFireDatabase,
    private usersService: UsersService,
    private dateService: DateService
  ) {}
  getEventsFormDb(date: Date) {
    return this.usersService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.db
            .object<Events>(
              `events/${user?.uid}/${this.dateService.transformDate(date)}`
            )
            .valueChanges()
        )
      );
  }
  setEvent(date: Date, fromTime: Date, toTime: Date, event: string) {
    if (date <= this.dateService.compareDate(date)) {
      if (
        this.dateService.getInaccurateComparedTime(
          this.dateService.transformTime(fromTime)
        )
      ) {
        return throwError(() => new Error('start time smaller'));
      }
      if (date < this.dateService.compareDate(date)) {
        return throwError(() => new Error('date smaller'));
      }
    }
    if (fromTime >= toTime) {
      return throwError(() => new Error('fromTime same or smaller'));
    }
    return this.usersService.getUser().pipe(
      switchMap((user) =>
        this.db
          .object(
            `events/${user?.uid}/${this.dateService.transformDate(
              date
            )}/${this.dateService.transformTime(fromTime)}`
          )
          .update({
            event: event,
            to: this.dateService.transformTime(toTime),
            done: false,
          })
      )
    );
  }
  deleteEvent(date: Date, time: string) {
    return this.usersService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.db
            .object(
              `events/${user?.uid}/${this.dateService.transformDate(
                date
              )}/${time}`
            )
            .remove()
        )
      );
  }
  markDone(date: Date, time: string) {
    return this.usersService.getUser().pipe(
      switchMap((user) =>
        this.db
          .object(
            `events/${user?.uid}/${this.dateService.transformDate(
              date
            )}/${time}`
          )
          .update({
            done: true,
          })
      )
    );
  }
  markNotDone(date: Date, time: string) {
    return this.usersService.getUser().pipe(
      switchMap((user) =>
        this.db
          .object(
            `events/${user?.uid}/${this.dateService.transformDate(
              date
            )}/${time}`
          )
          .update({
            done: false,
          })
      )
    );
  }
}
