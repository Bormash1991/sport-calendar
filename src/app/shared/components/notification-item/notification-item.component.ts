import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateService } from '../../services/date.service';
import { switchMap, take } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifMoreModalComponent } from '../notif-more-modal/notif-more-modal.component';
import { NotifItem } from 'src/app/models/notif-item.interface';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  ngOnInit(): void {
    this.value = this.notification[1].active;
  }
  constructor(
    private dateService: DateService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}
  value!: boolean;
  time!: string;
  event!: string;
  @Input() notification!: [string, NotifItem];
  toggleChange() {
    this.dateService
      .getDate()
      .pipe(
        take(1),
        switchMap((date) =>
          this.notificationService.changeActive(
            date,
            this.notification[0],
            this.value
          )
        )
      )
      .subscribe();
  }
  deleteNotif() {
    this.dateService
      .getDate()
      .pipe(
        take(1),
        switchMap((date) =>
          this.notificationService.deleteNotif(date, this.notification[0])
        )
      )
      .subscribe();
  }
  openMoreModal() {
    this.dialog.open(NotifMoreModalComponent, {
      data: {
        event: this.notification,
      },
    });
  }
}
