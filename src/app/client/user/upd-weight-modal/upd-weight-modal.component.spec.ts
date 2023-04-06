import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdWeightModalComponent } from './upd-weight-modal.component';

describe('UpdWeightModalComponent', () => {
  let component: UpdWeightModalComponent;
  let fixture: ComponentFixture<UpdWeightModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdWeightModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdWeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
