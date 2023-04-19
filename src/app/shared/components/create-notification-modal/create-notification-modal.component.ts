import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateService } from '../../services/date.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-notification-modal',
  templateUrl: './create-notification-modal.component.html',
  styleUrls: ['./create-notification-modal.component.scss'],
})
export class CreateNotificationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateNotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateService: DateService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}
  time: Date = new Date();
  date!: Date;
  ngOnInit(): void {
    this.dateService
      .getDate()
      .pipe(take(1))
      .subscribe((date) => (this.date = date));
  }
  form: FormGroup = this.fb.group({
    event: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(500),
        Validators.pattern('^[a-zA-Zа-яА-ЯіІїЇєЄ\\s]+$'),
      ],
    ],
  });

  upd() {
    let { event } = this.form.getRawValue();
    if (!this.form.invalid) {
      this.notificationService
        .setNotif(this.date, this.time, event)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBar.open('Подію додано', 'Закрити', {
              duration: 10000,
            });
            this.dialogRef.close();
          },
          error: (err) => {
            const message = err.message;
            if (message == 'start time smaller') {
              this.snackBar.open(
                'Час не може бути меншим ніж теп. час',
                'Закрити',
                {
                  duration: 10000,
                }
              );
            } else if (message == 'now time') {
              this.snackBar.open(
                'Не можна встановити на теперішній час',
                'Закрити',
                {
                  duration: 10000,
                }
              );
            } else if (message == 'date smaller') {
              this.snackBar.open(
                'Не можна встановити на минулу дату',
                'Закрити',
                {
                  duration: 10000,
                }
              );
            } else {
              this.snackBar.open('Щось пішло не так', 'Закрити', {
                duration: 10000,
              });
            }
          },
        });
    } else {
      this.snackBar.open('Поле Подія повинно бути заповненим ', 'Закрити', {
        duration: 10000,
      });
    }
  }
}
