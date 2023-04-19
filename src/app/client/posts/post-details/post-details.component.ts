import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.interface';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post!: Post;
  showError: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.postService.getOnePostFromDb(id).subscribe((data) => {
      if (data) {
        this.post = data;
      } else {
        this.showError = true;
      }
    });
  }
}
