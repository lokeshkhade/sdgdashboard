import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';



export type ChartOptions2 = {
  updateSeries(goal: any, value: any): unknown;
  updateOptions(arg0: { series: any[]; colors: string[]; }): unknown;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-reportgraph',
  templateUrl: './reportgraph.component.html',
  styleUrls: ['./reportgraph.component.scss']
})
export class ReportgraphComponent implements OnInit {

 

  @ViewChild("chart2") chart2!: ChartOptions2;
  public chartOptions2: Partial<ChartOptions2> | any;

  ////////////////////////////////////////////

  public G1: any;
  public G2: any;
  public G3: any;
  public G4: any;
  public G5: any;
  public G6: any;
  public G7: any;
  public G8: any;
  public G9: any;
  public G10: any;
  public G11: any;
  public G12: any;
  public G13: any;
  public G15: any;
  public G16: any;

  public year: any = [];
  /////////////////////////////////////////////// 
  public indicators: any = [];
  public graphindicator: any = [];
  ////////////////////////////
  public selecteddistrict: any;
  public selectedyear: any;
  public params = new HttpParams();

  public district: any = [];

  public test: any = [];

  ///////////////////////////

  public goalanalysis: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.goalanalysis = this.fb.group({ //definition to cons
      district_name: ['', Validators.required],
      valueyear: [2021, Validators.required],
    });


    ////////////////////////////////////////////////////

    this.chartOptions2 =
    {
      series: [],      
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
        type: "polarArea"
      },
      labels: ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4', 'Goal 5', 'Goal 6', 'Goal 7', 'Goal 8', 'Goal 9', 'Goal 10', 'Goal 11', 'Goal 12', 'Goal 13', 'Goal 15', 'Goal 16'],
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      colors: [],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          if (opts.seriesIndex == 13) {
            return ("G15" + ":" + (opts.w.config.series[opts.seriesIndex]).toFixed(0));
          }
          else if (opts.seriesIndex == 14) {
            return ("G16" + ":" + (opts.w.config.series[opts.seriesIndex]).toFixed(0));
          }
          else {
            return ("G" + ([opts.seriesIndex + 1]) + ":" + (opts.w.config.series[opts.seriesIndex]).toFixed(0));
          }
        },
      },     
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    //   this.chartOptions2 = {
    //     series: []
    //     ,
    //       chart: {
    //     type: 'polarArea'
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     // formatter: function (value, { seriesIndex, dataPointIndex }) {
    //     //   return value + ' (' + seriesIndex + ', ' + dataPointIndex + ')';
    //     // },
    //   }
    // };
  }

  ngOnInit(): void {
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.getyear();
    this.getdistrict()
    this.getgraph('DT01');
  }

  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;
    });
  }

  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });
  }  


  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    this.params = this.params.set("cgyear", event.value);
  }


  onDistrictSelected(event: any) {
    this.selecteddistrict = event.value;
    this.params = this.params.set("cgyear", event.value);
    this.getgraph(this.selecteddistrict);
  }


  getgraph(district: any) {

    this.ds.paramFunction('data/getpolarchart', district).subscribe((res: any) => {

      this.graphindicator = res;
      this.chart2.updateOptions({
        series: [
          +this.graphindicator[0].goalscore, +this.graphindicator[1].goalscore, +this.graphindicator[2].goalscore, +this.graphindicator[3].goalscore,
          +this.graphindicator[4].goalscore, +this.graphindicator[5].goalscore, +this.graphindicator[6].goalscore, +this.graphindicator[7].goalscore,
          +this.graphindicator[8].goalscore, +this.graphindicator[9].goalscore, +this.graphindicator[10].goalscore, +this.graphindicator[11].goalscore,
          +this.graphindicator[12].goalscore, +this.graphindicator[13].goalscore, +this.graphindicator[14].goalscore
        ],
        //colors: this.graphindicator.map((e: any) => +e?.goalscore <= 49 ? "#dd1e47" : "#ffc40c"),//#00a084
        colors: this.graphindicator.map((e: any) => {
          if (+e?.goalscore >= 0 && +e?.goalscore <= 49) {
            return "#dd1e47"
          }
          else if (+e?.goalscore >= 50 && +e?.goalscore <= 64) {
            return "#ffc40c"
          }
          else if (+e?.goalscore >= 65 && +e?.goalscore <= 99) {
            return "#00a084"
          }
          else if (+e?.goalscore >= 100) {
            return "#00aeef"
          }
        }),


      });
    });

  }


}
