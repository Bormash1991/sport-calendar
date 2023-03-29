import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { WeightGraphComponent } from './weight-graph/weight-graph.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ReminderComponent } from './reminder/reminder.component';
import { NewsComponent } from './news/news.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    CalendarComponent,
    WeightGraphComponent,
    ReminderComponent,
    NewsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedModule,
  ],
})
export class HomeModule {}
