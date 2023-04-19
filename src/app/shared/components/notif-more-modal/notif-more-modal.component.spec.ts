import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifMoreModalComponent } from './notif-more-modal.component';

describe('NotifMoreModalComponent', () => {
  let component: NotifMoreModalComponent;
  let fixture: ComponentFixture<NotifMoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifMoreModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifMoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
