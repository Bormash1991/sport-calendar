import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-create-exercise-modal',
  templateUrl: './create-exercise-modal.component.html',
  styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateExerciseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private exerciseService: ExerciseService
  ) {}

  fromTime: Date = new Date();
  toTime: Date = new Date();
  date!: Date;
  img!: string | ArrayBuffer | null;
  file!: File;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    items: 1,
    responsive: {},
    nav: false,
  };
  selectFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    const reader = new FileReader();
    input.onchange = () => {
      if (input && input.files) {
        const file = input.files[0];
        this.file = file;
        reader.readAsDataURL(file);
      }
    };
    reader.onload = () => {
      this.img = reader.result;
    };
    input.click();
  }

  form: FormGroup = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern('^[a-zA-Zа-яА-ЯіІїЇєЄ\\s]+$'),
      ],
    ],
    desc: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10000),
        Validators.pattern(/^[\s\S]*$/),
      ],
    ],
  });
  upd() {
    let { desc, title } = this.form.getRawValue();
    if (!this.form.invalid) {
      this.exerciseService.setExerciseInDb(this.file, desc, title);
    } else {
      this.snackBar.open('Заповніть поля та додайте картинку', 'Закрити', {
        duration: 10000,
      });
    }
    this.dialogRef.close();
  }
}
