import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, switchMap } from 'rxjs';
import { NotifItem } from 'src/app/models/notif-item.interface';
import { NotifItems } from 'src/app/models/notif-items.interface';
import { CreateNotificationModalComponent } from 'src/app/shared/components/create-notification-modal/create-notification-modal.component';
import { DateService } from 'src/app/shared/services/date.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit, OnDestroy {
  constructor(
    private notificationService: NotificationService,
    private dateService: DateService,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.eventsSubj.unsubscribe();
    this.notifSubj.unsubscribe();
  }
  areNotNotif: boolean = true;
  notifAccess: boolean = false;
  eventsSubj!: Subscription;
  notifSubj!: Subscription;
  notifications: [string, NotifItem][] = [];
  ngOnInit(): void {
    this.eventsSubj = this.dateService
      .getDate()
      .pipe(switchMap((date) => this.notificationService.getNotifFormDb(date)))
      .subscribe({
        next: (notifications) => {
          this.notifications = [];
          if (notifications) {
            this.transformNotif(notifications);
          }
        },
        error: () => {},
      });
    if ('Notification' in window) {
      this.notifSubj = this.notificationService.requestPermission().subscribe({
        next: (token) => {
          if (token) {
            this.notificationService.setTokenInDb(token);
            this.notifAccess = true;
          }
        },
        error: () => {},
      });
    } else {
      this.areNotNotif = false;
    }
  }

  transformNotif(notif: NotifItems) {
    for (const [key, value] of Object.entries(notif)) {
      this.notifications.push([key, value]);
    }
  }
  openDialog() {
    this.dialog.open(CreateNotificationModalComponent, {
      data: {},
    });
  }
}
