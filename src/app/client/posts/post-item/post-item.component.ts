import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() postItem!: [string, Post];
  btnClass: string = '';

  @Input() isAdmin: boolean = false;
  constructor(private postService: PostService, private router: Router) {}
  showBtn() {
    this.btnClass = 'show';
  }
  deletePost() {
    this.postService.deletePost(this.postItem[0]);
  }
  hideBtn() {
    this.btnClass = 'hide';
  }
  redirect(event: any) {
    if (
      event.target.classList[0] != 'mat-ripple' &&
      event.target.classList[0] != 'mat-icon'
    ) {
      this.router.navigateByUrl(`posts/${this.postItem[0]}`);
    }
  }
}
