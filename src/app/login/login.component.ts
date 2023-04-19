import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    let { email, password } = this.form.getRawValue();
    this.authService
      .login(email, password)
      .then(() => {
        this.router.navigateByUrl('');
      })
      .catch((er) => {
        const error = er.message.match(/\(auth\/[a-z-]+\)/)[0];
        if (error == '(auth/wrong-password)') {
          this.snackBar.open('Невірний пароль', 'Закрити', {
            duration: 10000,
          });
        } else if (error == '(auth/user-not-found)') {
          this.snackBar.open('Юзера не існує', 'Закрити', {
            duration: 10000,
          });
        }
        this.form.reset();
      });
  }
}
