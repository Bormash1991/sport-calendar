import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { Posts } from 'src/app/models/posts.interface';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  constructor(private postService: PostService) {}
  subjPosts!: Subscription;
  posts: [string, Post][] = [];
  ngOnInit(): void {
    this.subjPosts = this.postService.getPostsFormDb().subscribe((data) => {
      this.posts = [];
      if (data) {
        this.transfromEvents(data);
      }
    });
  }
  transfromEvents(events: Posts) {
    for (const [key, value] of Object.entries(events)) {
      this.posts.push([key, value]);
    }
    this.posts.reverse().slice(5);
  }
}
