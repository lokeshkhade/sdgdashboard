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


export type ChartOptions1 = {
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

  @ViewChild("chart1") chart1!: ChartOptions1;
  public chartOptions1: Partial<ChartOptions1> | any;

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
  public graphindicatorcm: any = [];
  ////////////////////////////
  public selecteddistrict: any;
  public selectedyear: any;
  public params = new HttpParams();

  public district: any = [];

  public test: any = [];



  public DT01: any;
  public DT01T: any;

  public DT02: any;
  public DT02T: any;

  public DT03: any;
  public DT03T: any;

  public DT04: any;
  public DT04T: any;

  public DT05: any;
  public DT05T: any;

  public DT06: any;
  public DT06T: any;

  public DT07: any;
  public DT07T: any;

  public DT08: any;
  public DT08T: any;

  public DT09: any;
  public DT09T: any;

  public DT10: any;
  public DT10T: any;

  public DT11: any;
  public DT11T: any;

  public DT12: any;
  public DT12T: any;

  public DT13: any;
  public DT13T: any;

  public DT14: any;
  public DT14T: any;

  public DT15: any;
  public DT15T: any;

  public DT16: any;
  public DT16T: any;

  public DT17: any;
  public DT17T: any;

  public DT18: any;
  public DT18T: any;

  public DT19: any;
  public DT19T: any;

  public DT20: any;
  public DT20T: any;

  public DT21: any;
  public DT21T: any;

  public DT22: any;
  public DT22T: any;

  public DT23: any;
  public DT23T: any;

  public DT24: any;
  public DT24T: any;

  public DT25: any;
  public DT25T: any;

  public DT26: any;
  public DT26T: any;

  public DT27: any;
  public DT27T: any;

  public DT28: any;
  public DT28T: any;

  public DT29: any;
  public DT29T: any;

  public DT30: any;
  public DT30T: any;

  public DT31: any;
  public DT31T: any;

  public DT32: any;
  public DT32T: any;

  public DT33: any;
  public DT33T: any;

  public cgyear:any;

  ///////////////////////////

  public goalanalysis: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.goalanalysis = this.fb.group({ //definition to cons
      district_name: ['', Validators.required],
      valueyear: [2021, Validators.required],
    });


    ////////////////////////////////////////////////////


    this.chartOptions1 =
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
        height: 550,
        type: "polarArea"
      },
      // labels: ['Balod', 'Baloda Bazar', 'Balrampur', 
      // 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Chhattisgarh',
      //   'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur',
      //   'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Korea', 'Mahasamund', 'Mungeli', 'Narayanpur','Raigarh',
      //   'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur','Surguja'],
      labels: ['बालोद', 'बलौदा बाजार', 'बलरामपुर',
        'बस्तर', 'बेमेतरा', 'बीजापुर', 'बिलासपुर', 'छत्तीसगढ',
        'दंतेवाड़ा', 'धमतरी', 'दुर्ग', 'गरियाबंद', 'जांजगीर-चंपा', 'जशपुर',
        'कबीरधाम', 'कांकेर', 'कोंडागांव', 'कोरबा', 'कोरिया', 'महासमुंद', 'मुंगेली', 'नारायणपुर','रायगढ़',
        'रायपुर', 'राजनंदगांव', 'सुकमा', 'सूरजपुर','सरगुजा'],
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 1,
      },
      colors: [],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "8px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "normal",
          colors: ['#F44336']
        }, 
        offsetY: -105,
        offsetX: -105,
        textAnchor: "middle",
        background: {
          padding: 5,
          opacity: 1.8,
        },       
        formatter: function (val, opts) {
          return ((opts.w.config.labels[opts.seriesIndex])+":"+(opts.w.config.series[opts.seriesIndex]).toFixed(0));
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
        opacity: 1,
      },
      colors: [],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "normal"
        },
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


    this.ds.paramFunction('data/getcompositescoreyearwise', 2022).subscribe((res: any) => {

      this.graphindicatorcm = res;
      console.log("34", this.graphindicatorcm);
      this.chart1.updateOptions({
        series: [
          +this.graphindicatorcm[0].compositescore, +this.graphindicatorcm[1].compositescore, +this.graphindicatorcm[2].compositescore, +this.graphindicatorcm[3].compositescore,
          +this.graphindicatorcm[4].compositescore, +this.graphindicatorcm[5].compositescore, +this.graphindicatorcm[6].compositescore, +this.graphindicatorcm[7].compositescore,
          +this.graphindicatorcm[8].compositescore, +this.graphindicatorcm[9].compositescore, +this.graphindicatorcm[10].compositescore, +this.graphindicatorcm[11].compositescore,
          +this.graphindicatorcm[12].compositescore, +this.graphindicatorcm[13].compositescore, +this.graphindicatorcm[14].compositescore, +this.graphindicatorcm[15].compositescore,
          +this.graphindicatorcm[16].compositescore, +this.graphindicatorcm[17].compositescore, +this.graphindicatorcm[18].compositescore,
          +this.graphindicatorcm[19].compositescore, +this.graphindicatorcm[20].compositescore, +this.graphindicatorcm[21].compositescore,
          +this.graphindicatorcm[22].compositescore, +this.graphindicatorcm[23].compositescore, +this.graphindicatorcm[24].compositescore,
          +this.graphindicatorcm[25].compositescore, +this.graphindicatorcm[26].compositescore, ++this.graphindicatorcm[27].compositescore
        ],
        //colors: this.graphindicator.map((e: any) => +e?.goalscore <= 49 ? "#dd1e47" : "#ffc40c"),//#00a084
        colors: this.graphindicatorcm.map((e: any) => {
          if (+e?.compositescore >= 0 && +e?.compositescore <= 49) {
            return "#dd1e47"
          }
          else if (+e?.compositescore >= 50 && +e?.compositescore <= 64) {
            return "#ffc40c"
          }
          else if (+e?.compositescore >= 65 && +e?.compositescore <= 99) {
            return "#00a084"
          }
          else if (+e?.compositescore >= 100) {
            return "#00aeef"
          }
        }),


      });
    });




  }


}
