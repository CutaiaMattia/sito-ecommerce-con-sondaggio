import { TestBed } from '@angular/core/testing';

import { DbNegozioService } from './db-negozio.service';

describe('DbNegozioService', () => {
  let service: DbNegozioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbNegozioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
