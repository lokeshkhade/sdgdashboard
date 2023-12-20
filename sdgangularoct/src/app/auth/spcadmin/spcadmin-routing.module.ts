import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpcadmindashboardComponent } from './spcadmindashboard/spcadmindashboard.component';
import { SpcadminadduserComponent } from './spcadminadduser/spcadminadduser.component';
import { ManageindicatorComponent } from './manageindicator/manageindicator.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AuditreportComponent } from './auditreport/auditreport.component';
import { FreezdataComponent } from './freezdata/freezdata.component';
import { UnfreezrequestComponent } from './unfreezrequest/unfreezrequest.component';
import { GeneratereportComponent } from './generatereport/generatereport.component';
import { PopulatedataComponent } from './populatedata/populatedata.component';



const routes: Routes = [

  { path: 'dashboard', component: SpcadmindashboardComponent },
  { path: 'adduser', component: SpcadminadduserComponent },
  { path: 'manageindicator', component: ManageindicatorComponent},
  { path: 'manageuser', component: ManageuserComponent },
  { path: 'auditreport', component: AuditreportComponent },
  { path: 'freezdata', component: FreezdataComponent  },
  { path: 'unfreezrequest', component: UnfreezrequestComponent },
  { path: 'generatereport', component: GeneratereportComponent },
  { path: 'populatedata', component: PopulatedataComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpcadminRoutingModule { }
