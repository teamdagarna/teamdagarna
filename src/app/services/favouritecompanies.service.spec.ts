import { TestBed, inject } from '@angular/core/testing';

import { FavouritecompaniesService } from './favouritecompanies.service';

describe('FavouritecompaniesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavouritecompaniesService]
    });
  });

  it('should be created', inject([FavouritecompaniesService], (service: FavouritecompaniesService) => {
    expect(service).toBeTruthy();
  }));
});
