import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerInactivityComponent } from './timer-inactivity.component';

describe('TimerInactivityComponent', () => {
  let component: TimerInactivityComponent;
  let fixture: ComponentFixture<TimerInactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerInactivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerInactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
