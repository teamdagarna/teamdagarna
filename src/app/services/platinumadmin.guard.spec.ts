import { TestBed, async, inject } from '@angular/core/testing';

import { PlatinumadminGuard } from './platinumadmin.guard';

describe('PlatinumadminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatinumadminGuard]
    });
  });

  it('should ...', inject([PlatinumadminGuard], (guard: PlatinumadminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
