import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: StudentsListComponent },
  { path: 'student', component: StudentPageComponent },
  { path: 'add', component: AddStudentComponent },
  { path: 'dashboard', component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }