import { TestBed } from '@angular/core/testing';

import { WpIonicService } from './wp-ionic.service';

describe('WpIonicService', () => {
  let service: WpIonicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpIonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
