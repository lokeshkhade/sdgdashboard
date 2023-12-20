import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeptdashboardComponent } from './deptdashboard/deptdashboard.component';
import { DeptlandingComponent } from './deptlanding/deptlanding.component';
import { DeptadduserComponent } from './deptadduser/deptadduser.component';

const routes: Routes = [
  { path: 'deptdashboard', component: DeptdashboardComponent },
  { path: 'deptlanding', component: DeptlandingComponent },
  { path: 'deptadduser', component: DeptadduserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
