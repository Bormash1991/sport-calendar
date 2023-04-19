import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateExerciseModalComponent } from './create-exercise-modal/create-exercise-modal.component';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { Subscription, take } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { Exercise } from 'src/app/models/exercise.interface';
import { Exercises } from 'src/app/models/exrcises.interface';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private exerciseService: ExerciseService,
    private usersService: UsersService
  ) {}
  ngOnDestroy() {
    this.subjExercises.unsubscribe();
    this.subjAdmin.unsubscribe();
  }
  checkAdmin: boolean = false;
  exercises: [string, Exercise][] = [];
  subjExercises!: Subscription;
  subjAdmin!: Subscription;
  ngOnInit() {
    this.subjExercises = this.exerciseService
      .getExercisesFormDb()
      .subscribe((date) => {
        this.exercises = [];
        if (date) {
          this.transfromEvents(date);
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
    this.dialog.open(CreateExerciseModalComponent, {
      data: {},
    });
  }
  transfromEvents(events: Exercises) {
    for (const [key, value] of Object.entries(events)) {
      this.exercises.push([key, value]);
    }
    this.exercises.reverse();
  }
}
