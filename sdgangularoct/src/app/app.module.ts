import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainheaderComponent } from './maindashboard/mainheader/mainheader.component';
import { MainfooterComponent } from './maindashboard/mainfooter/mainfooter.component';
import { MainfullComponent } from './maindashboard/mainfull/mainfull.component';
import { CgfullComponent } from './cgdashboard/cgfull/cgfull.component';
import { CgheaderComponent } from './cgdashboard/cgheader/cgheader.component';
import { AuthComponent } from './auth/auth.component';
import { IndiasvgComponent } from './maindashboard/indiasvg/indiasvg.component';
import { CgsvgComponent } from './maindashboard/cgsvg/cgsvg.component';
import { MdComponentModule } from './md-components/md-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoginComponent } from './login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CggpmComponent } from './cgdashboard/cggpm/cggpm.component';
import { CgallComponent } from './cgdashboard/cgall/cgall.component';
import { CgdistricttableComponent } from './cgdashboard/cgdistricttable/cgdistricttable.component';
import { SifbaselineComponent } from './sif/sifbaseline/sifbaseline.component';
import { SifbaselineheaderComponent } from './sif/sifbaselineheader/sifbaselineheader.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DistrictdashboardComponent } from './cgdashboard/districtdashboard/districtdashboard.component';
import { DistrictanalysisComponent } from './cgdashboard/districtanalysis/districtanalysis.component';
import { DistrictcompareComponent } from './cgdashboard/districtcompare/districtcompare.component';
import { GoalanalysisComponent } from './cgdashboard/goalanalysis/goalanalysis.component';
import { ReportgraphComponent } from './cgdashboard/reportgraph/reportgraph.component';
import { DistrictgoalcompareComponent } from './cgdashboard/districtgoalcompare/districtgoalcompare.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
    MainheaderComponent,
    MainfooterComponent,
    MainfullComponent,
    CgfullComponent,
    CgheaderComponent,
    AuthComponent,
    IndiasvgComponent,
    CgsvgComponent,
    LoginComponent,
    CggpmComponent,
    CgallComponent,
    CgdistricttableComponent,
    SifbaselineComponent,
    SifbaselineheaderComponent,
    DistrictdashboardComponent,
    DistrictanalysisComponent,
    DistrictcompareComponent,
    GoalanalysisComponent,
    ReportgraphComponent,
    DistrictgoalcompareComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdComponentModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    NgxSpinnerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return sessionStorage.getItem('token');
        },
        // whitelistedDomains: ['localhost:3000'],
        // blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })    
  ],
  providers: [
    DatePipe,   
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },


  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  
})
export class AppModule { }
