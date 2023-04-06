import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName!: string;
  checkAdmin: boolean = false;
  userImg!: string;
  date!: string;
  timer!: NodeJS.Timeout;
  constructor(
    private usersService: UsersService,
    private dateService: DateService
  ) {}
  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
  ngOnInit(): void {
    this.usersService.getUserInfo().subscribe((user: any) => {
      this.userName = user.name;
      this.userImg = user.img;
    });
    this.date = this.dateService.getMonthAndYear();
    this.timer = setTimeout(() => {
      if (this.date != this.dateService.getMonthAndYear()) {
        this.date = this.dateService.getMonthAndYear();
      }
    }, 5 * 60 * 1000);
  }
}
