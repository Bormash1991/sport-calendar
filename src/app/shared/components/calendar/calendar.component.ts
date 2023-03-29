import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  selected: any = new Date();

  chooseDate(e: any) {
    console.log(e);
  }
}
