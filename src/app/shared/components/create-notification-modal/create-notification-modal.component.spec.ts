import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotificationModalComponent } from './create-notification-modal.component';

describe('CreateNotificationModalComponent', () => {
  let component: CreateNotificationModalComponent;
  let fixture: ComponentFixture<CreateNotificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNotificationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
