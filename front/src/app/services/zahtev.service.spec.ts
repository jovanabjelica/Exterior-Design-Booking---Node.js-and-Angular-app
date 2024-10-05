import { TestBed } from '@angular/core/testing';

import { ZahtevService } from './zahtev.service';

describe('ZahtevService', () => {
  let service: ZahtevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
