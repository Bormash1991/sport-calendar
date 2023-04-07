import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}
  private currentDate$ = new BehaviorSubject<Date>(new Date());
  monthsList = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];
  getDate() {
    return this.currentDate$.asObservable();
  }
  setNewDate(newDate: Date) {
    this.currentDate$.next(newDate);
  }

  compareTime(time: string) {
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Number(hours),
      Number(minutes),
      now.getSeconds(),
      now.getMilliseconds()
    );
    return { now, targetTime };
  }
  compareDate(date: Date) {
    const now = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const millis = date.getMilliseconds();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Number(hours),
      Number(minutes),
      Number(seconds),
      Number(millis)
    );
  }
  getAccurateComparedTime(formatTime: string, currentDate: Date) {
    const { now, targetTime } = this.compareTime(formatTime);
    if (currentDate < now) {
      return false;
    }
    if (targetTime >= now) {
      return true;
    }
    return false;
  }
  getInaccurateComparedTime(formatTime: string) {
    const { now, targetTime } = this.compareTime(formatTime);
    if (targetTime < now) {
      return true;
    }
    return false;
  }

  transformDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}|${month}|${year}`;
  }
  transformTime(time: Date) {
    let hour = `${time.getHours()}`;
    let minute = `${time.getMinutes()}`;
    if (+minute < 10) {
      minute = '0' + minute;
    }
    if (+hour < 10) {
      hour = '0' + hour;
    }
    return `${hour}:${minute}`;
  }
  getMonthAndYear() {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    return `${this.monthsList[month]} ${day}, ${year}`;
  }
}
