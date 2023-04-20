import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { UsersService } from '../shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}
  @ViewChild('stepper') myStepper!: MatStepper;
  firstFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  secondFormGroup: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Zа-яА-ЯіІїЇєЄ\\s]+$'),
      ],
    ],
    date: ['', [Validators.required]],
    weight: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(500),
        Validators.pattern('\\d+'),
      ],
    ],
  });

  reg() {
    let { email, password } = this.firstFormGroup.getRawValue();
    let { name, date, weight } = this.secondFormGroup.getRawValue();
    this.authService
      .registration(email, password)
      .then((req) => {
        if (req.user) {
          this.router.navigateByUrl('/');
          return this.usersService.addUserInfo(
            name,
            weight,
            date,
            req.user?.uid
          );
        }
        return new Promise((resolve, reject) => {
          reject(req);
        });
      })
      .catch(() => {
        this.snackBar.open('Користувач з таким email вже існує', 'Закрити', {
          duration: 10000,
        });
        this.myStepper.reset();
      });
  }
}
