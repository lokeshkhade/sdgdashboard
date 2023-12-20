import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainfullComponent } from './maindashboard/mainfull/mainfull.component';
import { CgfullComponent } from './cgdashboard/cgfull/cgfull.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { CgdistricttableComponent } from './cgdashboard/cgdistricttable/cgdistricttable.component';
import { SifbaselineComponent } from './sif/sifbaseline/sifbaseline.component';
import { DistrictdashboardComponent } from './cgdashboard/districtdashboard/districtdashboard.component';
import { GoalanalysisComponent } from './cgdashboard/goalanalysis/goalanalysis.component';
import { DistrictcompareComponent } from './cgdashboard/districtcompare/districtcompare.component';
import { DistrictanalysisComponent } from './cgdashboard/districtanalysis/districtanalysis.component';
import { ReportgraphComponent } from './cgdashboard/reportgraph/reportgraph.component';
import { DistrictgoalcompareComponent } from './cgdashboard/districtgoalcompare/districtgoalcompare.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainfullComponent
  }, 
  {
    path: 'cghome',
    component: CgfullComponent
  },
  {
    path: 'sifbaseline',
    component: SifbaselineComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cghome/districtcompare/:distid/:year',
    //path: 'districtcompare',
    component: CgdistricttableComponent
  },  
  {
    path: 'cghome/districtdashboard/:distid/:goalid/:year',
    component: DistrictdashboardComponent
  },
  {
    path: 'cghome/districtgoalcompare/:distid/:goalid/:year',
    component: DistrictgoalcompareComponent
  }, 
  {
    path: 'cghome/goalanalysis/:goalid/:year',
    component: GoalanalysisComponent
  }, 
  {
    path: 'cghome/districtgraphcompare/:distid/:year',
    component: DistrictcompareComponent
  }, 
  {
    path: 'cghome/districtanalysis/:year',
    component: DistrictanalysisComponent
  },
  {
    path: 'cghome/reportgraph/:year',
    component: ReportgraphComponent
  },
  {
    path: '',
     component: AuthComponent,
    // canActivate: [AuthGuard, InternetauthGuard],
    children: [
      { path: 'spcadmin', loadChildren: () => import('./auth/spcadmin/spcadmin.module').then(m => m.SpcadminModule) },
      { path: 'district', loadChildren: () => import('./auth/district/district.module').then(m => m.DistrictModule) },
      { path: 'department', loadChildren: () => import('./auth/department/department.module').then(m => m.DepartmentModule) },
      { path: 'monitoring', loadChildren: () => import('./auth/monitoring/monitoring.module').then(m => m.MonitoringModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
