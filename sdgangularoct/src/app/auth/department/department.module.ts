import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DeptdashboardComponent } from './deptdashboard/deptdashboard.component';
import { DeptadduserComponent } from './deptadduser/deptadduser.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MdComponentModule } from 'src/app/md-components/md-components.module';
import { DeptlandingComponent } from './deptlanding/deptlanding.component';
import { DeptauditreportComponent } from './deptauditreport/deptauditreport.component';
import { DeptdifentryComponent } from './deptdifentry/deptdifentry.component';
import { DeptsifentryComponent } from './deptsifentry/deptsifentry.component';
import { DeptgeneratereportComponent } from './deptgeneratereport/deptgeneratereport.component';
import { DeptcgdifentryComponent } from './deptcgdifentry/deptcgdifentry.component';



@NgModule({
  declarations: [
    DeptdashboardComponent,
    DeptadduserComponent,
    DeptlandingComponent,
    DeptauditreportComponent,
    DeptdifentryComponent,
    DeptsifentryComponent,
    DeptgeneratereportComponent,
    DeptcgdifentryComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MdComponentModule,
    NgApexchartsModule  
  ]
})
export class DepartmentModule { }
