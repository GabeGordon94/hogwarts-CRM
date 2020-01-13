import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { SelectedStudentService } from '../selected-student.service'
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  private readonly notifier: NotifierService;


  currentStudent: Student
  existingMagicSkill: string
  existingMagicSkillLevel: number = 0
  desiredMagicSkill: string
  desiredMagicSkillLevel: number = 0
  interestedInCourse: string
  wasEditted: boolean = false
  firstName: string
  lastName: string

  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]

  courseList: string[] = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
    'Magic for medical professionals', 'Dating with magic']


  constructor(private studentsService: StudentsService, private selected: SelectedStudentService
    , private router: Router, notifierService: NotifierService, public dialog: MatDialog) {
    this.notifier = notifierService;
  }

  changeFirstName() {
    this.currentStudent['firstName'] = this.firstName
    this.wasEditted = true
  }
  changeLastName() {
    this.currentStudent['lastName'] = this.lastName
    this.wasEditted = true
  }

  addExistingMagicSkill() {
    if (this.existingMagicSkillLevel > 5) {
      this.existingMagicSkillLevel = 5
    } else if (this.existingMagicSkillLevel < 0) {
      this.existingMagicSkillLevel = 0
    }

    this.currentStudent['existingMagicSkills'][this.existingMagicSkill] = this.existingMagicSkillLevel
    this.existingMagicSkillLevel = 0
    this.existingMagicSkill = ''
    this.wasEditted = true
  }
  addDesiredMagicSkill() {
    if (this.desiredMagicSkillLevel > 5) {
      this.desiredMagicSkillLevel = 5
    } else if (this.desiredMagicSkillLevel < 0) {
      this.desiredMagicSkillLevel = 0
    }

    this.currentStudent['desiredMagicSkills'][this.desiredMagicSkill] = this.desiredMagicSkillLevel
    this.desiredMagicSkillLevel = 0
    this.desiredMagicSkill = ''
    this.wasEditted = true
  }
  addInterestInCourse() {
    this.currentStudent['interestedInCourse'] = [...this.currentStudent['interestedInCourse'], this.interestedInCourse]
    this.interestedInCourse = ''
    this.wasEditted = true
  }

  deleteDesiredMagicSkills(skillKey) {
    delete this.currentStudent['desiredMagicSkills'][skillKey]
    this.wasEditted = true
  }

  deleteExistingMagicSkills(skillKey) {
    delete this.currentStudent['existingMagicSkills'][skillKey]
    this.wasEditted = true
  }

  deleteInterestedCourse(course) {
    for (let i = 0; i < this.currentStudent['interestedInCourse'].length; i++) {
      if (course == this.currentStudent['interestedInCourse'][i]) {
        this.currentStudent['interestedInCourse'].splice(i, 1)
      }
    }
    this.wasEditted = true
  }


  updateStudent() {
    this.studentsService.updateStudent(this.currentStudent['id'], this.currentStudent)
    this.notifier.notify("info", "Student was updated!");
    this.wasEditted = false
  }

  deleteStudent() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this student?"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.studentsService.deleteStudent(this.currentStudent['id'], this.currentStudent)
        this.notifier.notify("error", "Student was deleted!");
      }
    })
  }

  checkIfSaved() {
    if (this.wasEditted) {
      let verify = window.confirm("Are you sure you want to continue without saving??")
      if (verify) {
        this.router.navigate([''])
      }
    } else {
      this.router.navigate([''])
    }

  }

  ngOnInit() {
    this.currentStudent = this.selected.selectedStudent
    if (this.currentStudent) {
      this.firstName = this.currentStudent['firstName']
      this.lastName = this.currentStudent['lastName']
    } else {
      this.router.navigate([''])
    }
  }

}
