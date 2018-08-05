import { TestBed, inject } from '@angular/core/testing';

import { IndicesService } from './indices.service';

describe('IndicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicesService]
    });
  });

  it('should be created', inject([IndicesService], (service: IndicesService) => {
    expect(service).toBeTruthy();
  }));
});
