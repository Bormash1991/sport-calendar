import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { dataForWeightModal } from 'src/app/models/dataForWeightModal.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-upd-weight-modal',
  templateUrl: './upd-weight-modal.component.html',
  styleUrls: ['./upd-weight-modal.component.scss'],
})
export class UpdWeightModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdWeightModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataForWeightModal,
    private fb: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}
  form: FormGroup = this.fb.group({
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

  upd() {
    let { weight } = this.form.getRawValue();
    if (!this.form.invalid) {
      this.usersService
        .updateWeight(this.data.year, this.data.weight, weight)
        .pipe(take(1))
        .subscribe({
          next: () => {},
          error: () => {},
        });
    } else {
      this.snackBar.open('Ви ввели не валідні дані', 'Закрити', {
        duration: 10000,
      });
    }
    this.dialogRef.close();
  }
}
