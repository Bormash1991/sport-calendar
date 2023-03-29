import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { ChooseDateComponent } from './choose-date/choose-date.component';

@NgModule({
  declarations: [CalendarComponent, ChooseDateComponent],
  imports: [CommonModule, CalendarRoutingModule],
})
export class CalendarModule {}
