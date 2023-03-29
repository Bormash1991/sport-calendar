import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightGraphComponent } from './weight-graph.component';

describe('WeightGraphComponent', () => {
  let component: WeightGraphComponent;
  let fixture: ComponentFixture<WeightGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
