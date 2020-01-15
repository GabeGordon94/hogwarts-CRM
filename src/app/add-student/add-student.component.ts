import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
// import { Student } from '../student';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})


export class AddStudentComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private studentsService: StudentsService, private router: Router,
    notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

  existingMagicSkillsObj: any = {}
  desiredMagicSkillsObj: any = {}
  interestedInCourseArray: string[] = []

  firstName: string
  lastName: string
  desiredMagicSkills: string
  desiredMagicSkillLevel: number = 0
  interestedInCourse: string
  existingMagicSkills: string
  existingMagicSkillLevel: number = 0

  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]

  courseList: string[] = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
    'Magic for medical professionals', 'Dating with magic']



  addMagicSkill() {
    if (this.desiredMagicSkillLevel > 5) {
      this.desiredMagicSkillLevel = 5
    } else if (this.desiredMagicSkillLevel < 0) {
      this.desiredMagicSkillLevel = 0
    }

    this.desiredMagicSkillsObj[this.desiredMagicSkills] = this.desiredMagicSkillLevel

    this.desiredMagicSkillLevel = 0
    this.desiredMagicSkills = ''
  }
  addInterestInCourse() {
    if (!this.interestedInCourseArray.includes(this.interestedInCourse)) {
      this.interestedInCourseArray = [...this.interestedInCourseArray, this.interestedInCourse];
    }
    this.interestedInCourse = ''

  }

  addExistingMagicSkill() {

    if (this.existingMagicSkillLevel > 5) {
      this.existingMagicSkillLevel = 5
    } else if (this.existingMagicSkillLevel < 0) {
      this.existingMagicSkillLevel = 0
    }

    this.existingMagicSkillsObj[this.existingMagicSkills] = this.existingMagicSkillLevel

    this.existingMagicSkillLevel = 0
    this.existingMagicSkills = ''
  }

  addStudent() {
    let newStudent: object = {
      firstName: this.firstName, lastName: this.lastName, existingMagicSkills: this.existingMagicSkillsObj,
      desiredMagicSkills: this.desiredMagicSkillsObj, interestedInCourse: this.interestedInCourseArray
    }
    this.studentsService.addStudent(newStudent)
    this.notifier.notify("success", "Student was added!");
    this.clearAttribute()
  }

  clearAttribute() {
    this.firstName = ''
    this.lastName = ''
    this.existingMagicSkillsObj = []
    this.desiredMagicSkillsObj = []
    this.interestedInCourseArray = []
    this.existingMagicSkills = ''
    this.desiredMagicSkills = ''
    this.interestedInCourse = ''

  }

  ngOnInit() {
    // this.router.navigate([''])
  }

}
