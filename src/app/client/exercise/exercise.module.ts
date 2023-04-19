import { MaterialModule } from 'src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { CreateExerciseModalComponent } from './create-exercise-modal/create-exercise-modal.component';
import { ExerciseItemComponent } from './exercise-item/exercise-item.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ExerciseComponent,
    CreateExerciseModalComponent,
    ExerciseItemComponent,
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    MaterialModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ExerciseModule {}
