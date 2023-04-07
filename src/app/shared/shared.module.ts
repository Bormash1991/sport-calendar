import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { WeightGraphComponent } from './components/weight-graph/weight-graph.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { MaterialModule } from '../material/material.module';
import { CreateEventModalComponent } from './components/create-event-modal/create-event-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventMoreModalComponent } from './components/event-more-modal/event-more-modal.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { CreateNotificationModalComponent } from './components/create-notification-modal/create-notification-modal.component';

@NgModule({
  declarations: [
    CalendarComponent,
    WeightGraphComponent,
    CreateEventModalComponent,
    EventItemComponent,
    EventMoreModalComponent,
    NotificationItemComponent,
    CreateNotificationModalComponent,
  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MaterialModule,
  ],
  providers: [AuthService, UsersService],
  exports: [
    CalendarComponent,
    WeightGraphComponent,
    EventItemComponent,
    NotificationItemComponent,
  ],
})
export class SharedModule {}
