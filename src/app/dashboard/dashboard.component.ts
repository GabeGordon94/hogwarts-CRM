import { Component, OnInit } from '@angular/core';
import { ClassListService } from '../class-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private classListService: ClassListService) { }

  magicSkills: string[] = [
    'Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility', 'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing'
  ]
  classList: object[]
  getStudentsPerMagicSkills(): number[][] {
    this.classList = this.classListService.classList
    let desiredMagicSkillsStudentPerSkill = []
    let currentMagicSkillsStudentPerSkill = []

    let sizeOfMagicSkills = this.magicSkills.length
    for (let i = 0; i < sizeOfMagicSkills; i++) {
      let counterDesired = 0
      let counterCurrent = 0
      for (let j = 0; j < this.classList.length; j++) {
        if (this.classList[j]['desiredMagicSkills'].includes(this.magicSkills[i])) {
          counterDesired++
        }
        if (this.classList[j]['currentMagicSkills'].includes(this.magicSkills[i])) {
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
      currentMagicSkillsStudentPerSkill[i] = counterCurrent
    }
    return [desiredMagicSkillsStudentPerSkill, currentMagicSkillsStudentPerSkill]
  }

  public pieChartLabelsDesired: string[] = this.magicSkills;
  public pieChartDataDesired: number[] = this.getStudentsPerMagicSkills()[0];
  public pieChartTypeDesired: string = 'pie';

  public pieChartLabelsCurrent: string[] = this.magicSkills;
  public pieChartDataCurrent: number[] = this.getStudentsPerMagicSkills()[1];
  public pieChartTypeCurrent: string = 'pie';



  ngOnInit() {
  }

}
