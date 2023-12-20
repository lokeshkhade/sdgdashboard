import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
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
  selector: 'app-spcadmindashboard',
  templateUrl: './spcadmindashboard.component.html',
  styleUrls: ['./spcadmindashboard.component.scss']
})
export class SpcadmindashboardComponent implements OnInit {

  public dashboardform: FormGroup; //add  FormGroup  
  public totalindicator: any = [];
  public enterindicator: any = [];
  public years: any = [];
  public selectedyear : any;

  ///////////////////////////
  @ViewChild("chart") chart!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private fb: FormBuilder, private ds: DataService, private datePipe: DatePipe) {
    this.dashboardform = this.fb.group({ //definition to cons
      valueyear: [2015, Validators.required]
    });

    this.chartOptions = {
      series: [
       
      ],
      chart: {
        type: "bar",
        height: 1000
      },
      plotOptions: {
        bar: {          
          horizontal: true,
          // columnWidth: "85%",
          // distributed: true,
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
          colors: ["#fff"]
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
    this.getallyears();
    this.selectedyear = 2015;
    this.getGraphData(this.selectedyear);
  }


  getallyears() {
    this.ds.getData('common/getdifyears').subscribe((res: any) => {
      this.years = res;
    });
  }

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    this.getGraphData(this.selectedyear);

  }


  isValidInput(fieldName: any): boolean {
    return this.dashboardform.controls[fieldName].invalid &&
      (this.dashboardform.controls[fieldName].dirty || this.dashboardform.controls[fieldName].touched);
  }


  reset() {
    window.location.reload();
  }

  getGraphData(year:any)
  {
    this.ds.getData('common/getdeptindicatorcount').subscribe((res: any) => {
      this.totalindicator = res;

      this.ds.paramFunction('common/getadmindashboard', year).subscribe((res: any) => {
        this.enterindicator = res;
   
            this.chart.updateOptions({
              series: [
                {
                  name: 'Indicator Count',
                  data: this.totalindicator.map((e: any) => +e?.indicatorcount)
                },
                {
                  name: 'Total Entries',
                  data: this.enterindicator.map((e: any) => +e?.entries)
                }
              ],

              xaxis: {
                type: "category",
                categories: this.totalindicator.map((e: any) => e?.department_name)

              },
              //colors: this.totalindicator.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),

            }); 

      });

    });

  }
  

  

  
}
