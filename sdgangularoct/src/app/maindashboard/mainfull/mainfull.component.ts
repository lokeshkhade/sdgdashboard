import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApexTooltip, ChartComponent } from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

/////////////////////////////////////////////////////////////////////

export type ChartOptions = {
  updateSeries(goal: any, value: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; colors: string[] }): unknown;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
};

////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-mainfull',
  templateUrl: './mainfull.component.html',
  styleUrls: ['./mainfull.component.scss']
})

export class MainfullComponent implements OnInit {

  public maindashboard: FormGroup; //add  FormGroup  
  public year: any = [];  
  public selectedyear: any;

  @ViewChild("chart1") chart1!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;
  public goaldata: any;  
  public colors: any = [  ]

  public params = new HttpParams();   
  
  constructor(private fb: FormBuilder, private ds: DataService) {
    
    this.maindashboard = this.fb.group({ //definition to cons
      index_report_year: [this.ds.currentyearindia.value.toString(), Validators.required]
    });

    /////////////////////CHART////////////////////////////
  
    this.chartOptions = {
      series: [  ],
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            // reset: true || '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp: any) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            }
          },
          autoSelected: 'zoom'
        },
        height: 450,
        type: "bar"
      },
      colors: this.colors,
      plotOptions: {
        bar: {
          columnWidth: "75%",
          distributed: true,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000'],
          fontSize: '14px'
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        // categories:
        //   this.deseaseWiseEntry.map((e: any) => e.name),
        // tickPlacement: 'on',
        // labels: {
        //   style: {
        //     colors: this.colors,
        //     fontSize: "14px",
        //   }
        // }
      }
    };
  }

  ////////////////////////////////////////////////////////

  ngOnInit(): void {
    this.selectedyear = this.ds.currentyearindia.value;
    this.getYear();
    this.getnitiaayogdatayearwise(this.selectedyear);
    this.ds.setYear(this.selectedyear);
  }

  ////////////////////////////////////////////////////////

  getYear() {
    this.ds.getData('data/getnitiaayogyear').subscribe((res: any) => {
      this.year = res; 
      //this.year.find((c: any) => c?.index_report_year == '2020');     
    });    
  }

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    //this.params = this.params.set("year", event.value);
    this.ds.setYear(this.selectedyear);
    this.getnitiaayogdatayearwise(event.value);    
  }

  /////////////////////////////////////////////////////////////////

  getnitiaayogdatayearwise(selectedyear:any) {
    this.ds.paramFunction('data/getnitiaayogdatayearwise', selectedyear).subscribe((res: any) => {
      this.goaldata = res;
      //this.chart.updateSeries(this.goaldata.goal,this.goaldata.value);
      this.chart1.updateOptions({
        series: [
          {
            name: 'Goal Score',
            data: this.goaldata.map((e: any) => +e?.value)
          }
        ],
        xaxis: {
          type: "category",
          categories: this.goaldata.map((e: any) => e?.goal)

        }, 
        //colors: this.goaldata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),
        colors: this.goaldata.map((e: any) => {
          if (+e?.value >= 0 && +e?.value <= 49) {
            return "#dd1e47"
          } 
          else if (+e?.value >= 50 && +e?.value <= 64) {
            return "#ffc40c"
          }
          else if (+e?.value >= 65 && +e?.value <= 99) {
            return "#00a084"  
          } 
          else if (+e?.value >= 100) {
            return "#00aeef"
          }  
        })
      });
    });
  }
  
}//last-one
