import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { PostItemComponent } from './post-item/post-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDetailsComponent } from './post-details/post-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PostsComponent,
    AddPostModalComponent,
    PostItemComponent,
    PostDetailsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PostsModule {}
