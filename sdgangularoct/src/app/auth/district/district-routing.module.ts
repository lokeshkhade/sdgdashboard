import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictentrydashboardComponent } from './districtentrydashboard/districtentrydashboard.component';
import { DistrictdifentryComponent } from './districtdifentry/districtdifentry.component';
import { DistricttemplateComponent } from './districttemplate/districttemplate.component';
import { DistrictuploadtemplateComponent } from './districtuploadtemplate/districtuploadtemplate.component';
import { DistrictnotificationComponent } from './districtnotification/districtnotification.component';

const routes: Routes = [

  { path: 'districtdashboard', component: DistrictentrydashboardComponent },
  { path: 'districtdifentry', component: DistrictdifentryComponent },
  { path: 'districttemplate', component: DistricttemplateComponent },
  { path: 'districtuploadtemplate', component: DistrictuploadtemplateComponent },
  { path: 'districtnotification', component:  DistrictnotificationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
