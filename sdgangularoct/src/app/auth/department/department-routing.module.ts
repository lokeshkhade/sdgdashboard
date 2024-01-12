import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeptdashboardComponent } from './deptdashboard/deptdashboard.component';
import { DeptlandingComponent } from './deptlanding/deptlanding.component';
import { DeptadduserComponent } from './deptadduser/deptadduser.component';
import { DeptauditreportComponent } from './deptauditreport/deptauditreport.component';
import { DeptsifentryComponent } from './deptsifentry/deptsifentry.component';
import { DeptdifentryComponent } from './deptdifentry/deptdifentry.component';
import { DeptgeneratereportComponent } from './deptgeneratereport/deptgeneratereport.component';
import { DeptcgdifentryComponent } from './deptcgdifentry/deptcgdifentry.component';

const routes: Routes = [
  { path: 'deptdashboard', component: DeptdashboardComponent },
  { path: 'deptlanding', component: DeptlandingComponent },
  { path: 'deptadduser', component: DeptadduserComponent },
  { path: 'deptauditreport', component: DeptauditreportComponent },
  { path: 'deptsifentry', component: DeptsifentryComponent },
  { path: 'deptdifentry', component: DeptdifentryComponent },
  { path: 'deptgeneratereport', component: DeptgeneratereportComponent },
  { path: 'deptcgdifentry', component: DeptcgdifentryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
