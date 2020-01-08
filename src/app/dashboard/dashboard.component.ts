import { Component, OnInit, Input } from '@angular/core';
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

  getStudentsPerMagicSkills():number[]{
    let desiredMagicSkillsStudentPerSkill=[]
    for(let i =0;i<this.magicSkills.length;i++){
      let counter=0
      for(let j=0;j<this.classList.length;j++){
        if(this.magicSkills[i] in this.classList[j]['desiredMagicSkills'])
          counter++
      }
      desiredMagicSkillsStudentPerSkill[i]=counter
    }
    return desiredMagicSkillsStudentPerSkill
  }


  public pieChartLabels: string[] = this.magicSkills;
  public pieChartData: number[] =  this.getStudentsPerMagicSkills();
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.classList = this.classListService.classList
  }

}
