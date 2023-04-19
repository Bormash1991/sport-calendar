import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPostItemComponent } from './small-post-item.component';

describe('SmallPostItemComponent', () => {
  let component: SmallPostItemComponent;
  let fixture: ComponentFixture<SmallPostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallPostItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
