import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DeptdashboardComponent } from './deptdashboard/deptdashboard.component';
import { DeptadduserComponent } from './deptadduser/deptadduser.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MdComponentModule } from 'src/app/md-components/md-components.module';
import { DeptlandingComponent } from './deptlanding/deptlanding.component';



@NgModule({
  declarations: [
    DeptdashboardComponent,
    DeptadduserComponent,
    DeptlandingComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MdComponentModule,
    NgApexchartsModule  
  ]
})
export class DepartmentModule { }
