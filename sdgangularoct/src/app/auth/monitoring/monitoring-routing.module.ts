import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringdashboardComponent } from './monitoringdashboard/monitoringdashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: MonitoringdashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
