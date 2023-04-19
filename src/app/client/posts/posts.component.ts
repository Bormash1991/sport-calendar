import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { PostService } from 'src/app/shared/services/post.service';
import { Subscription, take } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { Posts } from 'src/app/models/posts.interface';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  subjPosts!: Subscription;
  posts: [string, Post][] = [];
  checkAdmin: boolean = false;
  subjAdmin!: Subscription;
  constructor(
    public dialog: MatDialog,
    public postService: PostService,
    private usersService: UsersService
  ) {}
  ngOnDestroy() {
    this.subjPosts.unsubscribe();
    this.subjAdmin.unsubscribe();
  }
  ngOnInit() {
    this.subjPosts = this.postService.getPostsFormDb().subscribe((data) => {
      this.posts = [];
      if (data) {
        this.transfromEvents(data);
      }
    });
    this.subjAdmin = this.usersService.checkAdmin().subscribe({
      next: (checkResponse) => {
        this.checkAdmin = checkResponse;
      },
      error: () => {},
    });
  }
  openDialog() {
    this.dialog.open(AddPostModalComponent, {
      data: {},
    });
  }
  transfromEvents(events: Posts) {
    for (const [key, value] of Object.entries(events)) {
      this.posts.push([key, value]);
    }
    this.posts.reverse();
  }
}
