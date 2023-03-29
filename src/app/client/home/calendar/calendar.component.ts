import {
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
  selected: any = new Date();

  chooseDate(e: any) {
    console.log(e);
  }
}
