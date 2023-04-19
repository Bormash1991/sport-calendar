import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { ChooseDateComponent } from './choose-date/choose-date.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [CalendarComponent, ChooseDateComponent, EventsComponent],
  imports: [CommonModule, CalendarRoutingModule, SharedModule, MaterialModule],
})
export class CalendarModule {}
