import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [ClientComponent, HeaderComponent, NavBarComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
  ],
})
export class ClientModule {}
