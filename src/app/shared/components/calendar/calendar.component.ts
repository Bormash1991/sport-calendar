import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  selected!: Date;
  @Input() inputDate: boolean = false;
  subj!: Subscription;
  constructor(private dateService: DateService) {}

  chooseDate(e: Date) {
    this.dateService.setNewDate(e);
  }
  ngOnInit(): void {
    if (this.inputDate) {
      this.dateService.getDate().subscribe({
        next: (date) => {
          this.selected = date;
        },
        error: () => {},
      });
    } else {
      this.selected = new Date();
      this.dateService.setNewDate(this.selected);
    }
  }
}
