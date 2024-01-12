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



export type ChartOptions = {
  updateSeries(goal: any, value: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; }): unknown;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
  stroke: ApexStroke;
};

@Component({
  selector: 'app-deptdashboard',
  templateUrl: './deptdashboard.component.html',
  styleUrls: ['./deptdashboard.component.scss']
})

export class DeptdashboardComponent implements OnInit 
{
  public dashboardform: FormGroup; //add  FormGroup  
  public totalindicator: any = [];  public enterindicator: any = [];
  public years: any = [];  public selectedyear: any;
  public currentUser: any; public user_id: any; public deptname: any;
  isShow: boolean = true;

  ///////////////////////////
  @ViewChild("chart") chart!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private fb: FormBuilder, private ds: DataService, private datePipe: DatePipe, private authService: AuthService) 
  {
    this.dashboardform = this.fb.group({ //definition to cons
      valueyear: [2015, Validators.required]
    });

    this.chartOptions = {
      series: [

      ],
      chart: {
        type: "bar",
        height: 400
      },
      plotOptions: {
        bar: {
          vertical: true,
          columnWidth: "85%",
          distributed: false,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: []
      }
    };

  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getdeptname(this.currentUser.departmentid);
    this.getallyears();
    this.selectedyear = 2015;
    this.getGraphData(this.selectedyear);
  }


  getallyears() {
    this.ds.getData('common/getdifyears').subscribe((res: any) => {
      this.years = res;
    });
  }

  onYearSelected(event: any) 
  {
    this.selectedyear = event.value;
    this.getGraphData(this.selectedyear);

  }

  getdeptname(deptid: any) {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].description;
    });
  }



  isValidInput(fieldName: any): boolean 
  {
    return this.dashboardform.controls[fieldName].invalid &&
      (this.dashboardform.controls[fieldName].dirty || this.dashboardform.controls[fieldName].touched);
  }


  reset() 
  {
    window.location.reload();
  }

  getGraphData(year: any) {   

    this.ds.param2Function('common/gethoddashboard', year, this.currentUser.departmentid).subscribe((res: any) => {
        this.enterindicator = res;

        if (this.enterindicator == 'Data Not Found')
        {
          this.isShow=false;
        }
        else
        {
          this.isShow = true;
          this.chart.updateOptions({
            series: [
              {
                name: 'Indicator Count',
                data: this.enterindicator.map((e: any) => +e?.indiCnt)
              },
              {
                name: 'Total Entries',
                data: this.enterindicator.map((e: any) => +e?.indiCount)
              }
            ],

            xaxis: {
              type: "category",
              categories: this.enterindicator.map((e: any) => e?.district_name)

            },
            //colors: this.totalindicator.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),

          });
        }

        

      });
  }


}
