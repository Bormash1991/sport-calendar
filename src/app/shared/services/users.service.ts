import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) {}
  uploadImage(file: File, uid: string) {
    const filePath = `users/${uid}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, file)
      .then(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.db
            .object(`users/${uid}`)
            .update({
              img: url,
            })
            .catch(() =>
              this.snackBar.open('Щось пішло не так', 'Закрити', {
                duration: 10000,
              })
            );
        });
      })
      .catch(() =>
        this.snackBar.open('Щось пішло не так', 'Закрити', {
          duration: 10000,
        })
      );
  }
  addUserInfo(name: string, weight: string, date: string, uid: string) {
    return this.db.object(`users/${uid}`).set({
      name,
      weight: this.setWeight(weight),
      date: this.changeDate(date),
      year: new Date().getFullYear(),
      img: 'https://firebasestorage.googleapis.com/v0/b/sport-calendar-dcaab.appspot.com/o/users%2Funknown.png?alt=media&token=e94e3acb-4a55-45e3-8100-f9d1f826a337',
    });
  }
  changeDate(date: string) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  setWeight(weight: string) {
    const d = new Date();
    const month = d.getMonth();
    const weightArr = [];
    for (let i = 0; i < 12; i++) {
      if (month == i) {
        weightArr.push(weight);
      } else {
        weightArr.push('');
      }
    }
    return weightArr;
  }
  getUser() {
    return this.fireAuth.authState;
  }
  getUserInfo() {
    return this.getUser().pipe(
      switchMap((user) => this.db.object(`users/${user?.uid}`).valueChanges())
    );
  }
  checkAdmin() {}
  updateWeight(dateYear: number, weight: string[], newWeight: string) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    if (year === dateYear) {
      weight[month] = newWeight;
      return this.getUser().pipe(
        switchMap((user) =>
          this.db.object(`users/${user?.uid}`).update({
            weight: weight,
          })
        )
      );
    } else {
      return this.getUser().pipe(
        switchMap((user) =>
          this.db.object(`users/${user?.uid}`).update({
            weight: this.setWeight(newWeight),
            year: year,
          })
        )
      );
    }
  }
}
