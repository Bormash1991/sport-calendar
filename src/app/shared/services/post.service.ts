import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as uniqid from 'uniqid';
import { transliterate as slugify } from 'transliteration';
import { Posts } from 'src/app/models/posts.interface';
import { Post } from 'src/app/models/post.interface';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage
  ) {}
  getPostsFormDb() {
    return this.db.object<Posts>(`posts`).valueChanges();
  }
  getOnePostFromDb(id: string) {
    return this.db.object<Post>(`posts/${id}`).valueChanges();
  }
  setPostInDb(file: File, text: string, title: string) {
    const id = this.generateId(title);
    const filePath = `posts/${id}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, file)
      .then(() => {
        fileRef.getDownloadURL().subscribe({
          next: (url) => {
            this.db
              .object(`posts/${id}`)
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
  deletePost(id: string) {
    this.db
      .object(`posts/${id}`)
      .remove()
      .then(() =>
        this.snackBar.open('Пост видалено', 'Закрити', {
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
