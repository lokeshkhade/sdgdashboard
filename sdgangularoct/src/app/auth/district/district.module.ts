import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictRoutingModule } from './district-routing.module';
import { DistrictentrydashboardComponent } from './districtentrydashboard/districtentrydashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MdComponentModule } from 'src/app/md-components/md-components.module';
import { DistrictdifentryComponent } from './districtdifentry/districtdifentry.component';
import { DistricttemplateComponent } from './districttemplate/districttemplate.component';
import { DistrictuploadtemplateComponent } from './districtuploadtemplate/districtuploadtemplate.component';
import { DistrictnotificationComponent } from './districtnotification/districtnotification.component';


@NgModule({
  declarations: [
    DistrictentrydashboardComponent,
    DistrictdifentryComponent,
    DistricttemplateComponent,
    DistrictuploadtemplateComponent,
    DistrictnotificationComponent
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    MdComponentModule,
    NgApexchartsModule
  
  ]
})
export class DistrictModule { }
