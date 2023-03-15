import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvvenutaRegistrazioneComponent } from './avvenuta-registrazione.component';

describe('AvvenutaRegistrazioneComponent', () => {
  let component: AvvenutaRegistrazioneComponent;
  let fixture: ComponentFixture<AvvenutaRegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvvenutaRegistrazioneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvvenutaRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
