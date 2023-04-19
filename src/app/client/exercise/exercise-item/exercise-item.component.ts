import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Exercise } from 'src/app/models/exercise.interface';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent {
  @Input() item!: [string, Exercise];
  @Input() isAdmin: boolean = false;
  constructor(private exerciseService: ExerciseService) {}
  btnClass: string = '';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    responsive: {},
    nav: false,
  };
  showBtn() {
    this.btnClass = 'show';
  }
  deleteExercise() {
    this.exerciseService.deleteExercise(this.item[0]);
  }
  hideBtn() {
    this.btnClass = 'hide';
  }
}
