import { TestBed } from '@angular/core/testing';

import { SelectedStudentService } from './selected-student.service';

describe('SelectedStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedStudentService = TestBed.get(SelectedStudentService);
    expect(service).toBeTruthy();
  });
});
