import { TestBed, inject } from '@angular/core/testing';

import { ThirdapiService } from './thirdapi.service';

describe('ThirdapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdapiService]
    });
  });

  it('should be created', inject([ThirdapiService], (service: ThirdapiService) => {
    expect(service).toBeTruthy();
  }));
});
