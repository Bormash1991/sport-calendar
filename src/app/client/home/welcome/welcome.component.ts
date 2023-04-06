import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { CreateEventModalComponent } from 'src/app/shared/components/create-event-modal/create-event-modal.component';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  userName!: string;
  constructor(private usersService: UsersService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.usersService
      .getUserInfo()
      .pipe(take(1))
      .subscribe((user: any) => {
        this.userName = user.name.split(' ')[0];
      });
  }
  openDialog() {
    this.dialog.open(CreateEventModalComponent, {
      data: {},
    });
  }
}
