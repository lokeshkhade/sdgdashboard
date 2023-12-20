import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpcadminRoutingModule } from './spcadmin-routing.module';
import { SpcadmindashboardComponent } from './spcadmindashboard/spcadmindashboard.component';
import { SpcadminadduserComponent } from './spcadminadduser/spcadminadduser.component';
import { MdComponentModule } from 'src/app/md-components/md-components.module';
import { ManageindicatorComponent } from './manageindicator/manageindicator.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AuditreportComponent } from './auditreport/auditreport.component';
import { UnfreezrequestComponent } from './unfreezrequest/unfreezrequest.component';
import { GeneratereportComponent } from './generatereport/generatereport.component';
import { PopulatedataComponent } from './populatedata/populatedata.component';
import { FreezdataComponent } from './freezdata/freezdata.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    SpcadmindashboardComponent,
    SpcadminadduserComponent,
    ManageindicatorComponent,
    ManageuserComponent,
    AuditreportComponent,
    UnfreezrequestComponent,
    GeneratereportComponent,
    PopulatedataComponent,
    FreezdataComponent,
    
  ],
  imports: [
    CommonModule,
    SpcadminRoutingModule,
    MdComponentModule,
    NgApexchartsModule,
  ]
})
export class SpcadminModule { }
