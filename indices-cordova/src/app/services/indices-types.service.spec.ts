import { TestBed, inject } from '@angular/core/testing';

import { IndicesTypesService } from './indices-types.service';

describe('IndicesTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicesTypesService]
    });
  });

  it('should be created', inject([IndicesTypesService], (service: IndicesTypesService) => {
    expect(service).toBeTruthy();
  }));
});
