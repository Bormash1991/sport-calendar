import { NotifItems } from './../../models/notif-items.interface';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Observable, switchMap, take, throwError } from 'rxjs';
import { UsersService } from './users.service';
import { DateService } from './date.service';
import { AuthService } from './auth.service';
import { NotifItem } from 'src/app/models/notif-item.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private messaging: AngularFireMessaging,
    private db: AngularFireDatabase,
    private usersService: UsersService,
    private dateService: DateService,
    private authService: AuthService
  ) {}
  requestPermission() {
    return this.messaging.requestToken;
  }
  setTokenInDb(token: string) {
    this.getTokensFromDb().subscribe({
      next: (tokens) => {
        if (!tokens.length) {
          this.usersService
            .getUser()
            .pipe(
              switchMap((user) =>
                this.db.list(`users/${user?.uid}/tokens`).push(token)
              )
            )
            .subscribe({
              next: () => {},
              error: () => {},
            });
        } else {
          let check = true;
          tokens.forEach((item, i) => {
            if (item == token) {
              check = false;
            }
            if (check && i == tokens.length - 1) {
              this.usersService
                .getUser()
                .pipe(
                  switchMap((user) =>
                    this.db.list(`users/${user?.uid}/tokens`).push(token)
                  )
                )
                .subscribe({
                  next: () => {},
                  error: () => {},
                });
            }
          });
        }
      },
      error: () => {},
    });
  }
  deleteTokenAndLogOut(clientToken: string) {
    this.getTokensFromDb().subscribe({
      next: (tokens) => {
        tokens.forEach((token, i) => {
          if (clientToken == token) {
            tokens.splice(i, 1);
          }
        });
        this.usersService
          .getUser()
          .pipe(
            switchMap((user) =>
              this.db.object(`users/${user?.uid}/tokens`).set(tokens)
            )
          )
          .subscribe(() => this.authService.logOut());
      },
      error: () => {},
    });
  }
  getTokensFromDb() {
    return this.usersService.getUser().pipe(
      take(1),
      switchMap((user) =>
        this.db.list<string>(`users/${user?.uid}/tokens`).valueChanges()
      )
    );
  }
  deleteNotif(date: Date, time: string) {
    return this.usersService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.db
            .object(
              `notifications/${user?.uid}/${this.dateService.transformDate(
                date
              )}/${time}`
            )
            .remove()
        )
      );
  }
  getNotifFormDb(date: Date) {
    return this.usersService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.db
            .object<NotifItems>(
              `notifications/${user?.uid}/${this.dateService.transformDate(
                date
              )}`
            )
            .valueChanges()
        )
      );
  }
  getNotifItem() {
    return this.messaging.messages;
  }
  changeActive(date: Date, time: string, value: boolean) {
    return this.usersService.getUser().pipe(
      switchMap((user) =>
        this.db
          .object(
            `notifications/${user?.uid}/${this.dateService.transformDate(
              date
            )}/${time}`
          )
          .update({
            active: value,
          })
      )
    );
  }
  setNotif(date: Date, time: Date, event: string) {
    if (date <= this.dateService.compareDate(date)) {
      if (
        this.dateService.getInaccurateComparedTime(
          this.dateService.transformTime(time)
        )
      ) {
        return throwError(() => new Error('start time smaller'));
      }
      if (date < this.dateService.compareDate(date)) {
        return throwError(() => new Error('date smaller'));
      }
      if (
        `${date.getHours()}:${date.getMinutes()}` ==
        `${time.getHours()}:${time.getMinutes()}`
      ) {
        return throwError(() => new Error('now time'));
      }
    }
    return this.usersService.getUser().pipe(
      switchMap((user) =>
        this.db
          .object(
            `notifications/${user?.uid}/${this.dateService.transformDate(
              date
            )}/${this.dateService.transformTime(time)}`
          )
          .update({
            text: event,
            active: true,
          })
      )
    );
  }
}
