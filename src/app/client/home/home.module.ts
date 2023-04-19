import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NewsComponent } from './news/news.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    CalendarComponent,
    ReminderComponent,
    NewsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
  ],
})
export class HomeModule {}
