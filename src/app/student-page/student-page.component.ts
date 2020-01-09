import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { SelectedStudentService } from '../selected-student.service'
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  currentStudent: Student
  desiredMagicSkill: string
  desiredMagicSkillLevel:number=0
  interestedInCourse: string
  wasEditted: boolean=false


  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]

  courseList: string[] = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
    'Magic for medical professionals', 'Dating with magic']


  constructor(private studentsService: StudentsService, private selected: SelectedStudentService, ) { }


  addMagicSkill() {
    this.currentStudent['desiredMagicSkills'][this.desiredMagicSkill]=this.desiredMagicSkillLevel
    this.desiredMagicSkillLevel=0
    this.desiredMagicSkill = ''
    this.wasEditted=true
  }
  addInterestInCourse() {
    this.currentStudent['interestedInCourse'] = [...this.currentStudent['interestedInCourse'], this.interestedInCourse]
    this.interestedInCourse = ''
    this.wasEditted=true
  }
  

  updateStudent() {
    this.studentsService.updateStudent(this.currentStudent['id'], this.currentStudent)
    this.wasEditted=false
  }
  
  ngOnInit() {
    this.currentStudent = this.selected.selectedStudent
    console.log(this.currentStudent)
  }
  
}
