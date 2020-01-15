import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service'
import { SelectedStudentService } from '../selected-student.service';
// import { Student } from '../student';
import { ClassListService } from '../class-list.service';
import { ThemePalette } from '@angular/material';
import { NgxSpinnerService } from "../../../node_modules/ngx-spinner"


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @Input()
  color: ThemePalette

  studentsList: object = []
  selectedStudent: object
  displayedColumns: string[] = ['index','id', 'firstName', 'lastName']

  constructor(private studentsService: StudentsService, 
    private selectedStudentService: SelectedStudentService, 
    private classListService: ClassListService, private SpinnerService : NgxSpinnerService) { }

  getStudents(): void {
    this.SpinnerService.show();  
    this.studentsService.getStudents().subscribe((studentsList) => {
      this.studentsList = studentsList
      this.classListService.classList = studentsList
      this.SpinnerService.hide();  
    })
  }

  selectStudent(selection: object): void {
    this.selectedStudent = selection
    this.selectedStudentService.selectedStudent = selection
  }


  ngOnInit() {
    this.getStudents()
  }
}
