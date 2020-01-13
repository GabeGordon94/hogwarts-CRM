import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service'
import { SelectedStudentService } from '../selected-student.service';
import { Student } from '../student';
import { ClassListService } from '../class-list.service';
import { ThemePalette } from '@angular/material';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @Input()
  color: ThemePalette

  studentsList: object = []
  selectedStudent: Student
  displayedColumns: string[] = ['id', 'firstName', 'lastName']

  constructor(private studentsService: StudentsService, private selectedStudentService: SelectedStudentService, private classListService: ClassListService) { }

  getStudents(): void {
    this.studentsService.getStudents().subscribe((studentsList) => {
      this.studentsList = studentsList
      this.classListService.classList = studentsList
    })
  }

  selectStudent(selection: Student): void {
    this.selectedStudent = selection
    this.selectedStudentService.selectedStudent = selection
  }


  ngOnInit() {
    this.getStudents()
  }
}
