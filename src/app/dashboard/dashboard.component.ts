import { Component, OnInit } from '@angular/core';
import { ClassListService } from '../class-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private classListService: ClassListService, private router: Router) { }

  selectedTab:number =0

  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]
  classList: object[]

  addedPerDay: object
  addedPerMonth: object
  updatedPerDay: object
  updatedPerMonth: object

  getStudentsPerMagicSkills(): number[][] {

    this.classList = this.classListService.classList
    if (!this.classList) {
      this.router.navigate([''])
    }
    let desiredMagicSkillsStudentPerSkill = []
    let existingMagicSkillsStudentPerSkill = []

    let sizeOfMagicSkills = this.magicSkills.length
    for (let i = 0; i < sizeOfMagicSkills; i++) {
      let counterDesired = 0
      let counterCurrent = 0
      for (let j = 0; j < this.classList.length; j++) {
        if (this.classList[j]['desiredMagicSkills'][this.magicSkills[i]]) {
          counterDesired++
        }
        if (this.classList[j]['existingMagicSkills'][this.magicSkills[i]]) {
          counterCurrent++
        }
      }
      if (counterDesired == 0) {
        counterDesired = undefined
      }
      if (counterCurrent == 0) {
        counterCurrent = undefined
      }
      desiredMagicSkillsStudentPerSkill[i] = counterDesired
      existingMagicSkillsStudentPerSkill[i] = counterCurrent
    }
    return [desiredMagicSkillsStudentPerSkill, existingMagicSkillsStudentPerSkill]
  }

  getAddedByDayMonth(): object[] {
    this.classList = this.classListService.classList
    let addedPerDay: object = {}
    let addedPerMonth: object = {}

    let createdTimesArray: string[] = []
    this.classList.forEach(student => {
      createdTimesArray.push(student['creationTime'].slice(0, 10))
    })

    for (let i = 0; i < this.classList.length; i++) {
      for (let j = 0; j < createdTimesArray.length; j++) {
        if (this.classList[i]['creationTime'].slice(0, 10) === createdTimesArray[j]) {
          if (createdTimesArray[j] in addedPerDay) {
            addedPerDay[createdTimesArray[j]] = addedPerDay[createdTimesArray[j]] + 1
          } else {
            addedPerDay[createdTimesArray[j]] = 1
          }
          if (createdTimesArray[j].slice(3, 10) in addedPerMonth) {
            addedPerMonth[createdTimesArray[j].slice(3, 10)] = addedPerMonth[createdTimesArray[j].slice(3, 10)] + 1
            break
          } else {
            addedPerMonth[createdTimesArray[j].slice(3, 10)] = 1
            break
          }
        }
      }
    }
    return [addedPerDay, addedPerMonth]
  }

  getUpdatedByDayMonth(): object[] {
    this.classList = this.classListService.classList

    let updatedPerDay: object = {}
    let updatedPerMonth: object = {}

    let updatedTimesArray: string[] = []
    this.classList.forEach(student => {
      updatedTimesArray.push(student['lastUpdated'].slice(0, 10))
    })

    for (let i = 0; i < this.classList.length; i++) {
      for (let j = 0; j < updatedTimesArray.length; j++) {
        if (this.classList[i]['lastUpdated'].slice(0, 10) === updatedTimesArray[j]) {
          if (updatedTimesArray[j] in updatedPerDay) {
            updatedPerDay[updatedTimesArray[j]] = updatedPerDay[updatedTimesArray[j]] + 1
          } else {
            updatedPerDay[updatedTimesArray[j]] = 1
          }
          if (updatedTimesArray[j].slice(3, 10) in updatedPerMonth) {
            updatedPerMonth[updatedTimesArray[j].slice(3, 10)] = updatedPerMonth[updatedTimesArray[j].slice(3, 10)] + 1
            break
          } else {
            updatedPerMonth[updatedTimesArray[j].slice(3, 10)] = 1
            break
          }
        }
      }
    }
    return [updatedPerDay, updatedPerMonth]
  }

 

  getUpdatedAndAddedByDay(): any {
    let addedArrayFromFunc: object[] = this.getAddedByDayMonth()
    let updatedArrayFromFunc: object[] = this.getUpdatedByDayMonth()

    this.addedPerDay = addedArrayFromFunc[0]
    this.addedPerMonth = addedArrayFromFunc[1]
    this.updatedPerDay = updatedArrayFromFunc[0]
    this.updatedPerMonth = updatedArrayFromFunc[1]
  }

  public pieChartLabelsDesired: string[] = this.magicSkills;
  public pieChartDataDesired: number[] = this.getStudentsPerMagicSkills()[0];
  public pieChartTypeDesired: string = 'pie';

  public pieChartLabelsCurrent: string[] = this.magicSkills;
  public pieChartDataCurrent: number[] = this.getStudentsPerMagicSkills()[1];
  public pieChartTypeCurrent: string = 'pie';



  ngOnInit() {
    this.getUpdatedAndAddedByDay()
  }

}
