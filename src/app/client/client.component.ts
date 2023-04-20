import { Component } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { ScrollService } from '../shared/services/scroll.service';
import { debounceTime } from 'rxjs';
import { Notif } from '../models/notif.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  constructor(
    private notificationService: NotificationService,
    private scrollService: ScrollService
  ) {}
  notifBody!: Notif;
  activityClass: string = '';
  timer!: NodeJS.Timeout;
  navStatus: string = '';
  ngOnInit() {
    this.notificationService.getNotifItem().subscribe((data) => {
      if (data) {
        this.notifBody = data.notification as Notif;
        this.activityClass = 'show';
        this.timer = setTimeout(() => {
          this.activityClass = 'hide';
        }, 10000);
      }
    });
    this.scrollService
      .getScroll()
      .pipe(debounceTime(50))
      .subscribe((scroll) => {
        if (scroll) {
          this.navStatus = 'show-nav';
        } else {
          this.navStatus = 'hide-nav';
        }
      });
  }
  closePopup() {
    clearTimeout(this.timer);
    this.activityClass = 'hide';
  }
}
