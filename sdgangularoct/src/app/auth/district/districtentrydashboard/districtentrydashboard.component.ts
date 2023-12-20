import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import {
  ApexAxisChartSeries, ApexPlotOptions, ApexStroke,
  ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive, ApexMarkers, ApexAnnotations,
  ApexGrid
} from "ng-apexcharts";
import { ActivatedRoute, Router } from '@angular/router';

export type ChartOptions = {
  updateSeries(year: any, indicators_value: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; }): unknown;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
};

@Component({
  selector: 'app-districtentrydashboard',
  templateUrl: './districtentrydashboard.component.html',
  styleUrls: ['./districtentrydashboard.component.scss']
})

export class DistrictentrydashboardComponent implements OnInit {
  public dashboardform: FormGroup; //add  FormGroup 
  public indicators: any = [];
  public indicatorvalue: any = [];
  public selectedindicator: any;
  public deptname: any;
  public currentUser: any;
  public user_id: any; 
  ///////////////////////////
  @ViewChild("chart1") chart1!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private fb: FormBuilder, private ds: DataService, private datePipe: DatePipe, private authService: AuthService) 
  {    
    this.dashboardform = this.fb.group({ //definition to cons
      indicator_master_id: ['', Validators.required]
    });

    this.chartOptions = {
      series: [  ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#071185", "#078527"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Indicator Values Analysis",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: [],
        title: {
          text: "Year"
        }
      },
      yaxis: {
        title: {
          text: "Indicator Values"
        }
        ,
        min: 0
        // max:100,

      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };  
  }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getdeptname(this.currentUser.departmentid);
    this.getindicator(this.currentUser.departmentid); 
  }

  getdeptname(deptid: any) {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].department_name;    
    });
  }


  getindicator(deptid:any) {
    this.ds.paramFunction('common/getdeptindicator', deptid).subscribe((res: any) => {
      this.indicators = res;
      this.selectedindicator = this.indicators[0]?.indicator_master_id;
      this.dashboardform.get('indicator_master_id').setValue(+this.selectedindicator);//correct
      this.getGraphData(this.selectedindicator, this.currentUser.districtcode);
    });
  }

  onIndicatorSelected(event: any) {
    this.selectedindicator = event.value;
    this.getGraphData(this.selectedindicator, this.currentUser.districtcode);
  }

  isValidInput(fieldName: any): boolean {
    return this.dashboardform.controls[fieldName].invalid &&
      (this.dashboardform.controls[fieldName].dirty || this.dashboardform.controls[fieldName].touched);
  }

  reset() {
    window.location.reload();
  }

  getGraphData(indicator: any, districtid :  any) 
  {
    this.ds.param2Function('common/getindicatorvaluesbydistrict', indicator, districtid).subscribe((res: any) => {
      this.indicatorvalue = res;  

        this.chart1.updateOptions({
        series: [
          {
            name: "Indicator Value",
            data: this.indicatorvalue.map((e: any) => +e?.indicators_value)
          },
          {
            name: "Target Value",
            data: this.indicatorvalue.map((e: any) => +e?.kpi_target2030)
          }
        ],
        xaxis: {
          type: "Category",
          categories: this.indicatorvalue.map((e: any) => e?.valueyear)
        },
        //colors: this.goaldata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),       
        });
    });
  }



}//last line
