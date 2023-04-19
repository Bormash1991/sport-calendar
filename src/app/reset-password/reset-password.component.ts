import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  reset() {
    let { email } = this.form.getRawValue();
    this.authService
      .resetPassword(email)
      .then(() => {
        this.snackBar.open('Перевірте email', 'Закрити', {
          duration: 10000,
        });
      })
      .catch((er) => {
        const error = er.message.match(/\(auth\/[a-z-]+\)/)[0];

        if (error == '(auth/user-not-found)') {
          this.snackBar.open('Юзера не існує', 'Закрити', {
            duration: 10000,
          });
        } else {
          this.snackBar.open('Щось пішло не так ', 'Закрити', {
            duration: 10000,
          });
        }
      });
    this.form.reset();
  }
}
