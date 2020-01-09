import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  existingMagicSkillsObj: object = {}
  desiredMagicSkillsObj: object = {}
  interestedInCourseArray: string[] = []

  firstName: string
  lastName: string
  desiredMagicSkills: string
  desiredMagicSkillLevel: string
  interestedInCourse: string
  existingMagicSkills: string
  existingMagicSkillLevel:string

  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]

  courseList: string[] = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
    'Magic for medical professionals', 'Dating with magic']


  constructor(private studentsService: StudentsService) { }

  addMagicSkill() {
    this.desiredMagicSkillsObj[this.desiredMagicSkills]= this.desiredMagicSkillLevel

    this.desiredMagicSkillLevel=''
    this.desiredMagicSkills = ''
  }
  addInterestInCourse() {
    if (!this.interestedInCourseArray.includes(this.interestedInCourse)) {
      this.interestedInCourseArray = [...this.interestedInCourseArray, this.interestedInCourse];
    }
    this.interestedInCourse = ''
    
  }

  addExistingMagicSkill() {
    this.existingMagicSkillsObj[this.existingMagicSkills]= this.existingMagicSkillLevel

    this.existingMagicSkillLevel=''
    this.existingMagicSkills = ''
  }

  addStudent() {
    let newStudent: object = {
      firstName: this.firstName, lastName: this.lastName, existingMagicSkills: this.existingMagicSkillsObj,
      desiredMagicSkills: this.desiredMagicSkillsObj, interestedInCourse: this.interestedInCourseArray
    }
    this.studentsService.addStudent(newStudent)
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
  }

}
