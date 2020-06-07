import { TestBed } from '@angular/core/testing';

import { DailyActivityService } from './daily-activity.service';

describe('DailyActivityService', () => {
  let service: DailyActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
