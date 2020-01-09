import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  desiredMagicSkillsArray: string[] = []
  interestedInCourseArray: string[] = []
  existingMagicSkillsArray: string[] = []

  firstName: string
  lastName: string
  desiredMagicSkills: string
  interestedInCourse: string
  existingMagicSkills: string

  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]

  courseList: string[] = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
    'Magic for medical professionals', 'Dating with magic']


  constructor(private studentsService: StudentsService) { }

  addMagicSkill() {
    if (!this.desiredMagicSkillsArray.includes(this.desiredMagicSkills)) {
      this.desiredMagicSkillsArray = [...this.desiredMagicSkillsArray, this.desiredMagicSkills];
    }

    this.desiredMagicSkills = ''
  }
  addInterestInCourse() {
    if (!this.interestedInCourseArray.includes(this.interestedInCourse)) {
      this.interestedInCourseArray = [...this.interestedInCourseArray, this.interestedInCourse];
    }
    this.interestedInCourse = ''
  }

  addExistingMagicSkill() {
    if (!this.existingMagicSkillsArray.includes(this.existingMagicSkills)) {
      this.existingMagicSkillsArray = [...this.existingMagicSkillsArray, this.existingMagicSkills];
    }
    this.existingMagicSkills = ''
  }

  addStudent() {
    let newStudent: object = {
      firstName: this.firstName, lastName: this.lastName, existingMagicSkills: this.existingMagicSkillsArray,
      desiredMagicSkills: this.desiredMagicSkillsArray, interestedInCourse: this.interestedInCourseArray
    }
    this.studentsService.addStudent(newStudent)
    this.clearAttribute()
  }

  clearAttribute() {
    this.firstName = ''
    this.lastName = ''
    this.existingMagicSkillsArray = []
    this.desiredMagicSkillsArray = []
    this.interestedInCourseArray = []
    this.existingMagicSkills = ''
    this.desiredMagicSkills = ''
    this.interestedInCourse = ''

  }

  ngOnInit() {
  }

}
