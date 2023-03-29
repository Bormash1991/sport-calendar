import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  areNoReminders: boolean = false;
  ngOnInit(): void {
    this.checkNotifications();
  }
  checkNotifications() {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            // Разрешение на отправку уведомлений получено
          }
        });
      }
    } else {
      this.areNoReminders = true;
    }
  }
}
