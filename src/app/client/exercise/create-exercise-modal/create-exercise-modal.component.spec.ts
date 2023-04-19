import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExerciseModalComponent } from './create-exercise-modal.component';

describe('CreateExerciseModalComponent', () => {
  let component: CreateExerciseModalComponent;
  let fixture: ComponentFixture<CreateExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExerciseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
