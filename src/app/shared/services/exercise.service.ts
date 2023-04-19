import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uniqid from 'uniqid';
import { transliterate as slugify } from 'transliteration';
import { Exercises } from 'src/app/models/exrcises.interface';
@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage
  ) {}
  getExercisesFormDb() {
    return this.db.object<Exercises>(`exercise`).valueChanges();
  }

  setExerciseInDb(file: File, text: string, title: string) {
    const id = this.generateId(title);
    const filePath = `exercise/${id}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, file)
      .then(() => {
        fileRef.getDownloadURL().subscribe({
          next: (url) => {
            this.db
              .object(`exercise/${id}`)
              .set({
                img: url,
                text,
                title,
              })
              .then(() =>
                this.snackBar.open('Пост успішно додано', 'Закрити', {
                  duration: 10000,
                })
              )
              .catch(() =>
                this.snackBar.open('Щось пішло не так', 'Закрити', {
                  duration: 10000,
                })
              );
          },
          error: () => {},
        });
      })
      .catch(() =>
        this.snackBar.open('Щось пішло не так', 'Закрити', {
          duration: 10000,
        })
      );
  }
  deleteExercise(id: string) {
    this.db
      .object(`exercise/${id}`)
      .remove()
      .then(() =>
        this.snackBar.open('Вправу видалено', 'Закрити', {
          duration: 10000,
        })
      )
      .catch(() =>
        this.snackBar.open('Щось пішло не так', 'Закрити', {
          duration: 10000,
        })
      );
  }
  generateId(title: string) {
    return uniqid('', `-${slugify(title)}`);
  }
}
