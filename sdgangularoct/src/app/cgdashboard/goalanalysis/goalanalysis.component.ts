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

export type ChartOptions = {
  updateSeries(goal_id: any, GOALSCORE: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; colors: string[] }): unknown;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis; 
  colors: string[];
  grid: ApexGrid;
  legend: ApexLegend;
};

export type ChartOptions2 = {
  updateSeries(goal: any, value: any): unknown;
  updateOptions(arg0: { series: any[]; colors: string[]; labels: any[]; }): unknown;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-goalanalysis',
  templateUrl: './goalanalysis.component.html',
  styleUrls: ['./goalanalysis.component.scss']
})

export class GoalanalysisComponent implements OnInit {

  @ViewChild("chart1") chart1!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;

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

  //////////////////////////////////////////////

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

   /////////////////////////////////////////////
  public year: any;
  /////////////////////////////////////////////// 
  public indicators: any = [];
  public cgindicators: any = [];
  public indicatordata: any = [];
  public indicatorsdp: any = [];

  public normalizeddata: any = [];
  ////////////////////////////
  public selectedgoal: any; 
  public selectedyear: any;
  public selectedindicator: any;
  public params = new HttpParams();
  public totaltarget: any = []; public totaldepartment: any = []; public totalindicators: any = [];
  public totaltargetdesc: any = []; public totaldepartmentdesc: any = []; public totalindicatorsdesc: any = [];
  ///////////////////////////

  public goalanalysis: FormGroup; //add  FormGroup 
  
  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.goalanalysis = this.fb.group({ //definition to cons
       valueyear: [+this.route.snapshot.paramMap.get('year'), Validators.required]   ,
      indicatorsdp: ['', Validators.required]   
    });

    //////////////////////////////////////////////////////////

    this.chartOptions = 
    {
      series: [ ],
      chart: {
        height: 650,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true
        }
      },      
      colors: [],      
      legend: {
        show: false        
      },
      xaxis: {
        annotations: [{
          x: 3,
          y: 0,
          stroke: '#000',
          width: 2
        }]
      }
    };

    ////////////////////////////////////////////////////

    this.chartOptions2 =
    {
      series: [],
      chart: {
        // toolbar: {
        //   show: true,
        //   offsetX: 0,
        //   offsetY: 0,
        //   tools: {
        //     download: true           
        //   },
        //   export: {
        //     csv: {
        //       filename: undefined,
        //       columnDelimiter: ',',
        //       headerCategory: 'category',
        //       headerValue: 'value',
        //       dateFormatter(timestamp: any) {
        //         return new Date(timestamp).toDateString()
        //       }
        //     },
        //     svg: {
        //       filename: undefined,
        //     },
        //     png: {
        //       filename: undefined,
        //     }
        //   },
        //   autoSelected: 'zoom'
        // },
        height: 550,
        type: "polarArea",
      },
      labels: [],      
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      colors: [],
      dataLabels: {
        enabled: true,   
        style: {
          fontSize: "8px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold"
        },   
        formatter: function (val, opts) {         
          return (opts.w.config.labels[opts.seriesIndex] + ":" +opts.w.config.series[opts.seriesIndex].toFixed(0));          
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "top"
            }
          }
        }
      ]
    };

  }

  ngOnInit(): void {
    this.selectedgoal = this.route.snapshot.paramMap.get('goalid');
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.getyear();
    this.getcggoalscoreyearwise(this.selectedyear, this.selectedgoal);   
    this.getindiactor(this.selectedgoal);
    this.getdepartment(this.selectedgoal);
    this.gettargets(this.selectedgoal);
    this.getindicatorscount(this.selectedgoal);
    this.getdepartmentdesc(this.selectedgoal);
    this.getindicatorscountdesc(this.selectedgoal);
    this.gettargetsdesc(this.selectedgoal);  

    
  }

  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;
    });
  }

  getindiactor(goalid: any) {
    this.ds.paramFunction('common/getgoalwiseindicator', goalid).subscribe((res: any) => {
      this.indicatorsdp = res;
    });
  } 

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) 
  {
    this.selectedyear = event.value;
    this.getcggoalscoreyearwise(this.selectedyear, this.selectedgoal);  
  }

  onIndicatorSelected(event: any) 
  {
    this.selectedindicator = event.value;
    this.ds.param3Function('data/getcgdistrictcompositescorebyindicator', this.selectedyear, this.selectedgoal, this.selectedindicator).subscribe((res: any) => {
      this.indicatordata = res;

      this.chart1.updateOptions({
        series: [
          {
            name: 'Composite-Score',
            data: this.indicatordata.map((e: any) => +e?.goalscore)
          },
        ],
        xaxis: {
          type: "category",
          categories: this.indicatordata.map((e: any) => e?.district_name)

        },
        //colors: this.indicatordata.map((e: any) => +e?.goalscore <= 49 ? "#dd1e47" : "#ffc40c"),//#00a084
        colors: this.indicatordata.map((e: any) => {
          if (e?.district_code == 'CG01') {
            return "#00008B"
          }
          else {
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
          }
        })
      });

      this.chart2.updateOptions({
        series: [          
          this.indicatordata[0].goalscore, this.indicatordata[1].goalscore, this.indicatordata[2].goalscore,
          this.indicatordata[3].goalscore, this.indicatordata[4].goalscore, this.indicatordata[5].goalscore,
          this.indicatordata[6].goalscore, this.indicatordata[7].goalscore, this.indicatordata[8].goalscore,
          this.indicatordata[9].goalscore, this.indicatordata[10].goalscore, this.indicatordata[11].goalscore,
          this.indicatordata[12].goalscore, this.indicatordata[13].goalscore, this.indicatordata[14].goalscore,
          this.indicatordata[15].goalscore, this.indicatordata[16].goalscore, this.indicatordata[17].goalscore,
          this.indicatordata[18].goalscore, this.indicatordata[19].goalscore, this.indicatordata[20].goalscore,
          this.indicatordata[21].goalscore, this.indicatordata[22].goalscore, this.indicatordata[23].goalscore,
          this.indicatordata[24].goalscore, this.indicatordata[25].goalscore, this.indicatordata[26].goalscore, this.indicators[27].goalscore
        ],
        labels: [this.indicatordata[0].district_name, this.indicatordata[1].district_name, this.indicatordata[2].district_name,
        this.indicatordata[3].district_name, this.indicatordata[4].district_name, this.indicatordata[5].district_name,
        this.indicatordata[6].district_name, this.indicatordata[7].district_name, this.indicatordata[8].district_name,
        this.indicatordata[9].district_name, this.indicatordata[10].district_name, this.indicatordata[11].district_name,
        this.indicatordata[12].district_name, this.indicatordata[13].district_name, this.indicatordata[14].district_name,
        this.indicatordata[15].district_name, this.indicatordata[16].district_name, this.indicatordata[17].district_name,
        this.indicatordata[18].district_name, this.indicatordata[19].district_name, this.indicatordata[20].district_name,
        this.indicatordata[21].district_name, this.indicatordata[22].district_name, this.indicatordata[23].district_name,
          this.indicatordata[24].district_name, this.indicatordata[25].district_name, this.indicatordata[26].district_name, this.indicators[27].district_name],

        colors: this.indicatordata.map((e: any) => {
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

    this.getcgmapindicator();
  }

  getcggoalscoreyearwise(year: any, goalid: any) {
    this.ds.param2Function('data/getcggoalcompositescore', year, goalid).subscribe((res: any) => {
      this.cgindicators = res;
      for (var index in res) {
        if (res[index].goal_id == "Goal 1") {
          if (res[index].goalscore <= 49) {
            this.G1 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G1 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G1 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G1 = '#00aeef';
          }
          this.G2 = '#808080';
          this.G3 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 2") {
          if (res[index].goalscore <= 49) {
            this.G2 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G2 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G2 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G2 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G3 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 3") {
          if (res[index].goalscore <= 49) {
            this.G3 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G3 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G3 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G3 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 4") {
          if (res[index].goalscore <= 49) {
            this.G4 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G4 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G4 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G4 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G3 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 5") {
          if (res[index].goalscore <= 49) {
            this.G5 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G5 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G5 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G5 = '#00aeef';
          }
          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G3 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 6") {
          if (res[index].goalscore <= 49) {
            this.G6 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G6 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G6 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G6 = '#00aeef';
          }
          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G3 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 7") {
          console.log("helloo", res[index].goalscore);
          if (res[index].goalscore <= 49) {
            this.G7 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G7 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G7 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G7 = '#00aeef';
          }
          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G3 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 8") {
          if (res[index].goalscore <= 49) {
            this.G8 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G8 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G8 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G8 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G3 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 9") {
          if (res[index].goalscore <= 49) {
            this.G9 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G9 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G9 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G9 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G3 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';

        }

        if (res[index].goal_id == "Goal 10") {

          if (res[index].goalscore <= 49) {
            this.G10 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G10 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G10 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G10 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G3 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';

        }

        if (res[index].goal_id == "Goal 11") {
          if (res[index].goalscore <= 49) {
            this.G11 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G11 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G11 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G11 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G3 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';

        }

        if (res[index].goal_id == "Goal 12") {
          if (res[index].goalscore <= 49) {
            this.G12 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G12 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G12 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G12 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G3 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';
        }

        if (res[index].goal_id == "Goal 13") {
          if (res[index].goalscore <= 49) {
            this.G13 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G13 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G13 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G13 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G3 = '#808080';
          this.G15 = '#808080';
          this.G16 = '#808080';

        }

        if (res[index].goal_id == "Goal 15") {
          if (res[index].goalscore <= 49) {
            this.G15 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G15 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G15 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G15 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G3 = '#808080';
          this.G16 = '#808080';

        }

        if (res[index].goal_id == "Goal 16") {
          if (res[index].goalscore <= 49) {
            this.G16 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G16 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G16 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G16 = '#00aeef';
          }

          this.G1 = '#808080';
          this.G2 = '#808080';
          this.G4 = '#808080';
          this.G5 = '#808080';
          this.G6 = '#808080';
          this.G7 = '#808080';
          this.G8 = '#808080';
          this.G9 = '#808080';
          this.G10 = '#808080';
          this.G11 = '#808080';
          this.G12 = '#808080';
          this.G13 = '#808080';
          this.G15 = '#808080';
          this.G3 = '#808080';

        }
      }//for-loop 
    });

    this.ds.param2Function('data/getcgdistrictgoalcompositescore', year, goalid).subscribe((res: any) => {
      this.indicators = res;    

      this.chart1.updateOptions({
        series: [
          {
            name: 'Composite-Score',
            data: this.indicators.map((e: any) => +e?.goalscore)
          },
        ],
        xaxis: {
          type: "category",
          categories: this.indicators.map((e: any) => e?.district_name)

        },
        //colors: this.indicators.map((e: any) => +e?.goalscore <= 49 ? "#dd1e47" : "#ffc40c"),//#00a084
        colors: this.indicators.map((e: any) => {
          if (e?.district_code == 'CG01') {
            console.log(e?.district_code);
            return "#00008B"
          }
          else {
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
          }
        })
      });

      this.chart2.updateOptions({
        series: [
          // this.indicators.map((e?: any) => { 
          //   +e.goalscore 
          // })
          this.indicators[0].goalscore, this.indicators[1].goalscore, this.indicators[2].goalscore,
          this.indicators[3].goalscore, this.indicators[4].goalscore, this.indicators[5].goalscore,
          this.indicators[6].goalscore, this.indicators[7].goalscore, this.indicators[8].goalscore,
          this.indicators[9].goalscore, this.indicators[10].goalscore, this.indicators[11].goalscore,
          this.indicators[12].goalscore, this.indicators[13].goalscore, this.indicators[14].goalscore,
          this.indicators[15].goalscore, this.indicators[16].goalscore, this.indicators[17].goalscore,
          this.indicators[18].goalscore, this.indicators[19].goalscore, this.indicators[20].goalscore,
          this.indicators[21].goalscore, this.indicators[22].goalscore, this.indicators[23].goalscore,
          this.indicators[24].goalscore, this.indicators[25].goalscore, this.indicators[26].goalscore, this.indicators[27].goalscore
        ],
        labels: [this.indicators[0].district_name, this.indicators[1].district_name, this.indicators[2].district_name,
        this.indicators[3].district_name, this.indicators[4].district_name, this.indicators[5].district_name,
        this.indicators[6].district_name, this.indicators[7].district_name, this.indicators[8].district_name,
        this.indicators[9].district_name, this.indicators[10].district_name, this.indicators[11].district_name,
        this.indicators[12].district_name, this.indicators[13].district_name, this.indicators[14].district_name,
        this.indicators[15].district_name, this.indicators[16].district_name, this.indicators[17].district_name,
        this.indicators[18].district_name, this.indicators[19].district_name, this.indicators[20].district_name,
        this.indicators[21].district_name, this.indicators[22].district_name, this.indicators[23].district_name,
        this.indicators[24].district_name, this.indicators[25].district_name, this.indicators[26].district_name, this.indicators[27].district_name],

        colors: this.indicators.map((e: any) => {
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

    this.getcgmapgoal(year, goalid);
  }

  setdata(year: any, goalid: any) {
    this.selectedgoal = goalid;
    this.selectedyear = year;
    this.getindiactor(this.selectedgoal);
    this.getcggoalscoreyearwise(this.selectedyear, this.selectedgoal);
    this.getdepartment(this.selectedgoal);
    this.getindicatorscount(this.selectedgoal);
    this.gettargets(this.selectedgoal);   
    this.getdepartmentdesc(this.selectedgoal);
    this.getindicatorscountdesc(this.selectedgoal);
    this.gettargetsdesc(this.selectedgoal); 
  }  

  // -----------------------------------------//

  getdepartment(goal : any) {
    this.ds.paramFunction('common/getgoalwisedeptcount', goal).subscribe((res: any) => {
      this.totaldepartment = res;
    });
  }

  gettargets(goal: any) {
    this.ds.paramFunction('common/getgoalwisediftargetcount',goal).subscribe((res: any) => {
      this.totaltarget = res;
    });
  }

  getindicatorscount(goal: any) {
    this.ds.paramFunction('common/getgoalwisedifindicatorscount', goal).subscribe((res: any) => {
      this.totalindicators = res;
    });
  }

  // ------------------------------------ //

  getdepartmentdesc(goal: any) {
    this.ds.paramFunction('common/getgoalwisedeptdesc', goal).subscribe((res: any) => {
      this.totaldepartmentdesc = res;
    });
  }

  gettargetsdesc(goal: any) {
    this.ds.paramFunction('common/getgoalwisediftargetdesc', goal).subscribe((res: any) => {
      this.totaltargetdesc = res;
    });
  }

  getindicatorscountdesc(goal: any) {
    this.ds.paramFunction('common/getgoalwisedifindicatorsdesc', goal).subscribe((res: any) => {
      this.totalindicatorsdesc = res;
    });
  }


  // -------------------MAP-----------------//


  getcgmapindicator() {
    this.ds.param3Function('data/getcgdistrictcompositescorebyindicator', this.selectedyear, this.selectedgoal, this.selectedindicator).subscribe((res: any) => {
      this.indicatordata = res;
      for (var index in res) {
        if (res[index].district_code == "DT01") {
          if (res[index].goalscore <= 49) {
            this.DT01 = '#dd1e47';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT01 = '#ffc40c';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT01 = '#00a084';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT01 = '#00aeef';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT02") {
          if (res[index].goalscore <= 49) {
            this.DT02 = '#dd1e47';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT02 = '#ffc40c';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT02 = '#00a084';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT02 = '#00aeef';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT03") {
          if (res[index].goalscore <= 49) {
            this.DT03 = '#dd1e47';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT03 = '#ffc40c';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT03 = '#00a084';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT03 = '#00aeef';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT04") {
          if (res[index].goalscore <= 49) {
            this.DT04 = '#dd1e47';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT04 = '#ffc40c';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT04 = '#00a084';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT04 = '#00aeef';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT05") {
          if (res[index].goalscore <= 49) {
            this.DT05 = '#dd1e47';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT05 = '#ffc40c';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT05 = '#00a084';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT05 = '#00aeef';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT06") {
          if (res[index].goalscore <= 49) {
            this.DT06 = '#dd1e47';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT06 = '#ffc40c';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT06 = '#00a084';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT06 = '#00aeef';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT07") {
          if (res[index].goalscore <= 49) {
            this.DT07 = '#dd1e47';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT07 = '#ffc40c';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT07 = '#00a084';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT07 = '#00aeef';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT08") {
          if (res[index].goalscore <= 49) {
            this.DT08 = '#dd1e47';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT08 = '#ffc40c';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT08 = '#00a084';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT08 = '#00aeef';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT09") {
          if (res[index].goalscore <= 49) {
            this.DT09 = '#dd1e47';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT09 = '#ffc40c';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT09 = '#00a084';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT09 = '#00aeef';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT10") {
          if (res[index].goalscore <= 49) {
            this.DT10 = '#dd1e47';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT10 = '#ffc40c';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT10 = '#00a084';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT10 = '#00aeef';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT11") {
          if (res[index].goalscore <= 49) {
            this.DT11 = '#dd1e47';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT11 = '#ffc40c';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT11 = '#00a084';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT11 = '#00aeef';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT12") {
          if (res[index].goalscore <= 49) {
            this.DT12 = '#dd1e47';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT12 = '#ffc40c';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT12 = '#00a084';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT12 = '#00aeef';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT13") {
          if (res[index].goalscore <= 49) {
            this.DT13 = '#dd1e47';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT13 = '#ffc40c';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT13 = '#00a084';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT13 = '#00aeef';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT14") {
          if (res[index].goalscore <= 49) {
            this.DT14 = '#dd1e47';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT14 = '#ffc40c';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT14 = '#00a084';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT14 = '#00aeef';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT15") {
          if (res[index].goalscore <= 49) {
            this.DT15 = '#dd1e47';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT15 = '#ffc40c';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT15 = '#00a084';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT15 = '#00aeef';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT16") {
          if (res[index].goalscore <= 49) {
            this.DT16 = '#dd1e47';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT16 = '#ffc40c';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT16 = '#00a084';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT16 = '#00aeef';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT17") {
          if (res[index].goalscore <= 49) {
            this.DT17 = '#dd1e47';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT17 = '#ffc40c';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT17 = '#00a084';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT17 = '#00aeef';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT18") {
          if (res[index].goalscore <= 49) {
            this.DT18 = '#dd1e47';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT18 = '#ffc40c';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT18 = '#00a084';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT18 = '#00aeef';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT19") {
          if (res[index].goalscore <= 49) {
            this.DT19 = '#dd1e47';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT19 = '#ffc40c';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT19 = '#00a084';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT19 = '#00aeef';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT20") {
          if (res[index].goalscore <= 49) {
            this.DT20 = '#dd1e47';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT20 = '#ffc40c';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT20 = '#00a084';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT20 = '#00aeef';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT21") {
          if (res[index].goalscore <= 49) {
            this.DT21 = '#dd1e47';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT21 = '#ffc40c';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT21 = '#00a084';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT21 = '#00aeef';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT22") {
          if (res[index].goalscore <= 49) {
            this.DT22 = '#dd1e47';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT22 = '#ffc40c';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT22 = '#00a084';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT22 = '#00aeef';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT23") {
          if (res[index].goalscore <= 49) {
            this.DT23 = '#dd1e47';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT23 = '#ffc40c';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT23 = '#00a084';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT23 = '#00aeef';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT24") {
          if (res[index].goalscore <= 49) {
            this.DT24 = '#dd1e47';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT24 = '#ffc40c';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT24 = '#00a084';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT24 = '#00aeef';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT25") {
          if (res[index].goalscore <= 49) {
            this.DT25 = '#dd1e47';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT25 = '#ffc40c';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT25 = '#00a084';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT25 = '#00aeef';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT26") {
          if (res[index].goalscore <= 49) {
            this.DT26 = '#dd1e47';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT26 = '#ffc40c';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT26 = '#00a084';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT26 = '#00aeef';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT27") {
          if (res[index].goalscore <= 49) {
            this.DT27 = '#dd1e47';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT27 = '#ffc40c';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT27 = '#00a084';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT27 = '#00aeef';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

      }//for
    });//
  }//function-end


  getcgmapgoal(year : any, goalid : any) {
    this.ds.param2Function('data/getcgdistrictgoalcompositescore', year, goalid).subscribe((res: any) => {
      this.cgindicators = res;
      for (var index in res) {
        if (res[index].district_code == "DT01") {
          if (res[index].goalscore <= 49) {
            this.DT01 = '#dd1e47';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT01 = '#ffc40c';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT01 = '#00a084';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT01 = '#00aeef';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT02") {
          if (res[index].goalscore <= 49) {
            this.DT02 = '#dd1e47';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT02 = '#ffc40c';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT02 = '#00a084';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT02 = '#00aeef';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT03") {
          if (res[index].goalscore <= 49) {
            this.DT03 = '#dd1e47';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT03 = '#ffc40c';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT03 = '#00a084';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT03 = '#00aeef';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT04") {
          if (res[index].goalscore <= 49) {
            this.DT04 = '#dd1e47';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT04 = '#ffc40c';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT04 = '#00a084';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT04 = '#00aeef';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT05") {
          if (res[index].goalscore <= 49) {
            this.DT05 = '#dd1e47';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT05 = '#ffc40c';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT05 = '#00a084';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT05 = '#00aeef';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT06") {
          if (res[index].goalscore <= 49) {
            this.DT06 = '#dd1e47';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT06 = '#ffc40c';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT06 = '#00a084';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT06 = '#00aeef';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT07") {
          if (res[index].goalscore <= 49) {
            this.DT07 = '#dd1e47';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT07 = '#ffc40c';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT07 = '#00a084';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT07 = '#00aeef';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT08") {
          if (res[index].goalscore <= 49) {
            this.DT08 = '#dd1e47';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT08 = '#ffc40c';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT08 = '#00a084';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT08 = '#00aeef';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT09") {
          if (res[index].goalscore <= 49) {
            this.DT09 = '#dd1e47';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT09 = '#ffc40c';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT09 = '#00a084';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT09 = '#00aeef';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT10") {
          if (res[index].goalscore <= 49) {
            this.DT10 = '#dd1e47';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT10 = '#ffc40c';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT10 = '#00a084';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT10 = '#00aeef';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT11") {
          if (res[index].goalscore <= 49) {
            this.DT11 = '#dd1e47';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT11 = '#ffc40c';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT11 = '#00a084';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT11 = '#00aeef';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT12") {
          if (res[index].goalscore <= 49) {
            this.DT12 = '#dd1e47';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT12 = '#ffc40c';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT12 = '#00a084';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT12 = '#00aeef';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT13") {
          if (res[index].goalscore <= 49) {
            this.DT13 = '#dd1e47';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT13 = '#ffc40c';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT13 = '#00a084';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT13 = '#00aeef';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT14") {
          if (res[index].goalscore <= 49) {
            this.DT14 = '#dd1e47';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT14 = '#ffc40c';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT14 = '#00a084';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT14 = '#00aeef';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT15") {
          if (res[index].goalscore <= 49) {
            this.DT15 = '#dd1e47';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT15 = '#ffc40c';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT15 = '#00a084';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT15 = '#00aeef';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT16") {
          if (res[index].goalscore <= 49) {
            this.DT16 = '#dd1e47';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT16 = '#ffc40c';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT16 = '#00a084';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT16 = '#00aeef';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT17") {
          if (res[index].goalscore <= 49) {
            this.DT17 = '#dd1e47';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT17 = '#ffc40c';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT17 = '#00a084';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT17 = '#00aeef';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT18") {
          if (res[index].goalscore <= 49) {
            this.DT18 = '#dd1e47';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT18 = '#ffc40c';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT18 = '#00a084';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT18 = '#00aeef';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT19") {
          if (res[index].goalscore <= 49) {
            this.DT19 = '#dd1e47';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT19 = '#ffc40c';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT19 = '#00a084';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT19 = '#00aeef';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT20") {
          if (res[index].goalscore <= 49) {
            this.DT20 = '#dd1e47';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT20 = '#ffc40c';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT20 = '#00a084';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT20 = '#00aeef';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT21") {
          if (res[index].goalscore <= 49) {
            this.DT21 = '#dd1e47';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT21 = '#ffc40c';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT21 = '#00a084';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT21 = '#00aeef';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT22") {
          if (res[index].goalscore <= 49) {
            this.DT22 = '#dd1e47';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT22 = '#ffc40c';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT22 = '#00a084';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT22 = '#00aeef';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT23") {
          if (res[index].goalscore <= 49) {
            this.DT23 = '#dd1e47';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT23 = '#ffc40c';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT23 = '#00a084';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT23 = '#00aeef';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT24") {
          if (res[index].goalscore <= 49) {
            this.DT24 = '#dd1e47';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT24 = '#ffc40c';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT24 = '#00a084';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT24 = '#00aeef';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT25") {
          if (res[index].goalscore <= 49) {
            this.DT25 = '#dd1e47';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT25 = '#ffc40c';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT25 = '#00a084';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT25 = '#00aeef';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT26") {
          if (res[index].goalscore <= 49) {
            this.DT26 = '#dd1e47';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT26 = '#ffc40c';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT26 = '#00a084';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT26 = '#00aeef';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

        if (res[index].district_code == "DT27") {
          if (res[index].goalscore <= 49) {
            this.DT27 = '#dd1e47';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.DT27 = '#ffc40c';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.DT27 = '#00a084';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
          else if (res[index].goalscore >= 100) {
            this.DT27 = '#00aeef';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].goalscore;
          }
        }

      }//for
    });//
  }//function-end


  goaldata(districtid: any)
  {
    this.ds.param3Function('data/getnormalizedata', this.selectedgoal, this.selectedyear, districtid).subscribe((res: any) => {
      this.normalizeddata = res;
      console.log(this.normalizeddata);
    });
    
  }



}
