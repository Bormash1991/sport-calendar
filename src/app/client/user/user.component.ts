import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { UpdWeightModalComponent } from './upd-weight-modal/upd-weight-modal.component';
import { Subscription, take } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  userName!: string;
  checkAdmin: boolean = false;
  userDate!: string;
  userImg!: string;
  currentUserWeight!: string;
  userWeight!: string[];
  year!: number;
  uid!: string;
  userInfoSubj!: Subscription;
  userSubj!: Subscription;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  ngOnDestroy(): void {
    this.userInfoSubj.unsubscribe();
    this.userSubj.unsubscribe();
  }
  ngOnInit(): void {
    this.userInfoSubj = this.usersService.getUserInfo().subscribe({
      next: (user) => {
        if (user) {
          this.userName = user.name;
          this.userDate = user.date;
          this.userWeight = user.weight;
          this.year = user.year;
          this.userImg = user.img;
          const d = new Date();
          const month = d.getMonth();
          this.currentUserWeight = user.weight[month]
            ? `${user.weight[month]} кг`
            : 'Ви не зважувалися цьго місяця';
        }
      },
      error: () => {},
    });
    this.userSubj = this.usersService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.uid = user.uid;
        }
      },
      error: () => {},
    });
  }
  selectFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      if (input && input.files) {
        const file = input.files[0];
        this.usersService.uploadImage(file, this.uid);
      }
    };
    input.click();
  }

  logOut() {
    this.notificationService
      .requestPermission()
      .pipe(take(1))
      .subscribe((token) => {
        if (token) {
          this.notificationService.deleteTokenAndLogOut(token);
        }
      });
  }
  openDialog() {
    this.dialog.open(UpdWeightModalComponent, {
      data: {
        year: this.year,
        weight: this.userWeight,
      },
    });
  }
}
