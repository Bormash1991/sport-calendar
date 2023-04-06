import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateService } from '../../services/date.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.scss'],
})
export class CreateEventModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dateService: DateService,
    private eventService: EventService
  ) {}
  fromTime: Date = new Date();
  toTime: Date = new Date();
  date!: Date;
  ngOnInit(): void {
    this.dateService.getDate().subscribe((date) => (this.date = date));
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
    time: '',
  });

  upd() {
    let { event } = this.form.getRawValue();
    if (!this.form.invalid) {
      this.eventService
        .setEvent(this.date, this.fromTime, this.toTime, event)
        .subscribe({
          next: () => {
            this.snackBar.open('Подію додано', 'Закрити', {
              duration: 10000,
            });
            this.dialogRef.close();
          },
          error: (err) => {
            const message = err.message;
            if (message == 'present time smaller') {
              this.snackBar.open(
                'Час початку не може бути меншим ніж теп. час',
                'Закрити',
                {
                  duration: 10000,
                }
              );
            } else if (message == 'fromTime same or smaller') {
              this.snackBar.open(
                'Час закінчення події повенен відрізнятися і не бути меншим за час події',
                'Закрити',
                {
                  duration: 10000,
                }
              );
            } else {
              this.snackBar.open('Подія на такий час уже існує', 'Закрити', {
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
