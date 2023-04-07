import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  areNotReminders: boolean = false;
  ngOnInit(): void {}
  checkNotifications() {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
          }
        });
      }
    } else {
      this.areNotReminders = true;
    }
  }
}
