import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttivaAccountComponent } from './attiva-account.component';

describe('AttivaAccountComponent', () => {
  let component: AttivaAccountComponent;
  let fixture: ComponentFixture<AttivaAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttivaAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttivaAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
