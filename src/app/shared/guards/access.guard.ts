import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard {
  constructor(private usersService: UsersService, private router: Router) {}
  canActivate() {
    return this.usersService.getUser().pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigateByUrl('login');
          return false;
        }
      })
    );
  }
}
