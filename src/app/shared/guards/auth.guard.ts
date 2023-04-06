import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, take } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private usersService: UsersService, private router: Router) {}
  canActivate() {
    return this.usersService.getUser().pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigateByUrl('');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
