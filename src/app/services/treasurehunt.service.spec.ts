import { TestBed, inject } from '@angular/core/testing';

import { TreasurehuntService } from './treasurehunt.service';

describe('TreasurehuntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreasurehuntService]
    });
  });

  it('should be created', inject([TreasurehuntService], (service: TreasurehuntService) => {
    expect(service).toBeTruthy();
  }));
});
