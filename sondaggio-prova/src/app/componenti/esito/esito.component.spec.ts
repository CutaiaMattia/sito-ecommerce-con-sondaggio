import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsitoComponent } from './esito.component';

describe('EsitoComponent', () => {
  let component: EsitoComponent;
  let fixture: ComponentFixture<EsitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsitoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
