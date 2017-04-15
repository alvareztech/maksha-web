import { TestBed, inject } from '@angular/core/testing';

import { TechnologyService } from './technology.service';

describe('TechnologyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnologyService]
    });
  });

  it('should ...', inject([TechnologyService], (service: TechnologyService) => {
    expect(service).toBeTruthy();
  }));
});
