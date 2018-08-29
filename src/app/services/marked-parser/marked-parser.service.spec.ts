import { TestBed, inject } from '@angular/core/testing';

import { MarkedParserService } from './marked-parser.service';

describe('MarkedParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkedParserService]
    });
  });

  it('should be created', inject([MarkedParserService], (service: MarkedParserService) => {
    expect(service).toBeTruthy();
  }));
});
