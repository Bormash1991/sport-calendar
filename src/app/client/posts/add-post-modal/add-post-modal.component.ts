import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateService } from 'src/app/shared/services/date.service';
import { EventService } from 'src/app/shared/services/event.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.scss'],
})
export class AddPostModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddPostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) {}

  fromTime: Date = new Date();
  toTime: Date = new Date();
  date!: Date;
  img!: string | ArrayBuffer | null;
  file!: File;

  selectFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    const reader = new FileReader();
    input.onchange = () => {
      if (input && input.files) {
        this.file = input.files[0];
        reader.readAsDataURL(this.file);
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
    text: [
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
    let { text, title } = this.form.getRawValue();

    if (!this.form.invalid) {
      this.postService.setPostInDb(this.file, text, title);
    } else {
      this.snackBar.open('Заповніть поля та додайте картинку', 'Закрити', {
        duration: 10000,
      });
    }
    this.dialogRef.close();
  }
}
