import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifPopupComponent } from './notif-popup.component';

describe('NotifPopupComponent', () => {
  let component: NotifPopupComponent;
  let fixture: ComponentFixture<NotifPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
