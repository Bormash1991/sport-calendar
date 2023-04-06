import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { UpdWeightModalComponent } from './upd-weight-modal/upd-weight-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userName!: string;
  checkAdmin: boolean = false;
  userDate!: string;
  userImg!: string;
  currentUserWeight!: string;
  userWeight!: string[];
  year!: number;
  uid!: string;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.usersService.getUserInfo().subscribe((user: any) => {
      this.userName = user.name;
      this.userDate = user.date;
      this.userWeight = user.weight;
      this.year = user.year;
      this.userImg = user.img;
      const d = new Date();
      const month = d.getMonth();
      this.currentUserWeight = `${user.weight[month]} кг`;
    });
    this.usersService.getUser().subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
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
    this.authService.logOut();
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
