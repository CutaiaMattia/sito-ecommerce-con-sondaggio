import { TestBed } from '@angular/core/testing';

import { DatiService } from './dati.service';

describe('DatiService', () => {
  let service: DatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
