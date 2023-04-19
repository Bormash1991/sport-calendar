import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/models/user.interface';
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
      .subscribe({
        next: (user) => {
          if (user) {
            this.userName = user.name.split(' ')[0];
          }
        },
        error: () => {},
      });
  }
  openDialog() {
    this.dialog.open(CreateEventModalComponent, {
      data: {},
    });
  }
}
