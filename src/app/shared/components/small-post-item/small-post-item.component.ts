import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-small-post-item',
  templateUrl: './small-post-item.component.html',
  styleUrls: ['./small-post-item.component.scss'],
})
export class SmallPostItemComponent {
  @Input() post!: [string, Post];
}
