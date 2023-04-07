import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMoreModalComponent } from './event-more-modal.component';

describe('EventMoreModalComponent', () => {
  let component: EventMoreModalComponent;
  let fixture: ComponentFixture<EventMoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMoreModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
