import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notif } from 'src/app/models/notif.interface';

@Component({
  selector: 'app-notif-popup',
  templateUrl: './notif-popup.component.html',
  styleUrls: ['./notif-popup.component.scss'],
})
export class NotifPopupComponent {
  @Input() notifBody!: Notif;
  @Output() closePopup = new EventEmitter<boolean>();
  close() {
    this.closePopup.emit(true);
  }
}
