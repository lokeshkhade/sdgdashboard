import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringdashboardComponent } from './monitoringdashboard/monitoringdashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MdComponentModule } from 'src/app/md-components/md-components.module';


@NgModule({
  declarations: [
    MonitoringdashboardComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MdComponentModule,
    NgApexchartsModule
  ]
})
export class MonitoringModule { }
