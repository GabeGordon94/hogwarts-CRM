import { Injectable } from '@angular/core';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class SelectedStudentService {
  public selectedStudent: Student;
  constructor() { }
}
