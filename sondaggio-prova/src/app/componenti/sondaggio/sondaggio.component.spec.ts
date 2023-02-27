import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondaggioComponent } from './sondaggio.component';

describe('SondaggioComponent', () => {
  let component: SondaggioComponent;
  let fixture: ComponentFixture<SondaggioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondaggioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
