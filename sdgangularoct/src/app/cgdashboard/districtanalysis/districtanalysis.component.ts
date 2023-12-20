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
};

export type ChartOptions2 = {
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
};

export type ChartOptions3 = {
  updateSeries(year: any, indicators_value: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; }): unknown;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export type ChartOptions4 = {
  updateSeries(year: any, indicators_value: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; }): unknown;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-districtanalysis',
  templateUrl: './districtanalysis.component.html',
  styleUrls: ['./districtanalysis.component.scss']
})
export class DistrictanalysisComponent implements OnInit {
  public year: any = [];
  public district: any = [];
  public goals: any = [];
  public indicators: any = [];
  public indicatorsdata: any = [];
  public indicatorsdata2: any = [];
  ////////////////////////////
  public selectedgoal: any; 
  public selecteddistrictname1: any;
  public selecteddistrictname2: any;
  public selecteddistrictcode: any; 
  public selecteddistrictcode1: any;
  public selectedyear: any;
  public selectedyear1: any;
  public selectedindicator: any; public selectedindicatordesc: any;
  public params = new HttpParams();
  public colors: any = [];
  public indicatormax: any = [];
  public indicatormin: any = [];
  public indicatordistrict: any = [];
  public indicatorcg: any = [];
  ///////////////////////////
  @ViewChild("chart1") chart1!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;
  ////////////////////////////////
  @ViewChild("chart2") chart2!: ChartOptions2;
  public chartOptions2: Partial<ChartOptions2> | any;
  ///////////////////////////
  @ViewChild("chart3") chart3!: ChartOptions3;
  public chartOptions3: Partial<ChartOptions3> | any;
  /////////////////////////////////////
  @ViewChild("chart4") chart4!: ChartOptions4;
  public chartOptions4: Partial<ChartOptions4> | any;
  /////////////////////////

  public districtcompare: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.districtcompare = this.fb.group({ //definition to cons
      valueyear: [+this.route.snapshot.paramMap.get('year'), Validators.required],
      district_name: ['DT01', Validators.required],
      valueyear1: [+this.route.snapshot.paramMap.get('year'), Validators.required],
      district_name1: ['DT01', Validators.required],
      goal_id: ['Goal 1', Validators.required],
      indicators: [1051, Validators.required]
    });

    this.chartOptions = {
      series: [
        
      ],
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

    this.chartOptions2 = {
      series: [

      ],
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
      colors: ["#77B6EA", "#545454"],
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

    this.chartOptions3 = {
      series: [

      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [

        ]
      },
      yaxis: {
        title: {
          text: "Normalized Score"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return + val;
          }
        }
      }
    };

    this.chartOptions4 = {
      series: [

      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [

        ]
      },
      yaxis: {
        title: {
          text: "Normalized Score"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return + val;
          }
        }
      }
    };
  }

  ngOnInit(): void {   
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.selectedgoal = 'Goal 1';
    this.selecteddistrictcode='DT01';
    this.selecteddistrictcode1 = 'DT01';
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.selectedyear1 = this.route.snapshot.paramMap.get('year');
    this.selectedindicator = 1051;
    this.getyear();
    this.getgoals();
    this.getindiactor('Goal 1');
    this.getdistrict();   
    this.getdistrictname1('DT01');
    this.getdistrictname2('DT01');
    this.getindicatorvaluesChart(this.selectedgoal, this.selecteddistrictcode, this.selecteddistrictcode1,
    this.selectedindicator);

    this.getcomparisondata1(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
    this.getcomparisondata2(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode1);
  }

  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;
    });
  }

  getgoals()
  {
    this.ds.getData('common/getgoals').subscribe((res: any) => {
      this.goals = res;
    }); 
  }  

  getindiactor(goalid: any)
  {
    this.ds.paramFunction('common/getgoalwiseindicator', goalid).subscribe((res: any) => {
      this.indicators = res;
    });
  }

  onIndicatorSelected(event: any) 
  { 
    this.selectedindicator = event.value;
    this.getindicatorvaluesChart(this.selectedgoal, this.selecteddistrictcode, this.selecteddistrictcode1,
      this.selectedindicator);
    this.getcomparisondata1(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
    this.getcomparisondata2(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode1);
  }

  ////////////////////////////////////////////////////////////// 

  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });
  }


  getdistrictname1(districtcode:any) {
    this.ds.paramFunction('common/getdistirctname', districtcode).subscribe((res: any) => {
      this.selecteddistrictname1 = res[0].district_name;
    });
  }

  getdistrictname2(districtcode: any) {
    this.ds.paramFunction('common/getdistirctname', districtcode).subscribe((res: any) => {
      this.selecteddistrictname2 = res[0].district_name;
    });
  }

  /////////////////////

  getindicatorvaluesChart(goalid: any, districtid: any, districtid1: any, indicatorid : any) {
      this.ds.param3Function('data/getindicatorvaluesbyindicatorid', goalid, districtid, indicatorid ).subscribe((res: any) => {
        this.indicatorsdata = res;     
        this.selectedindicatordesc = this.indicatorsdata[0]?.district_indicator_desc;
        this.chart1.updateOptions({
          series: [
            {
              name: 'Indicator Value',
              data: this.indicatorsdata.map((e: any) => +e?.indicators_value)
            },
            {
              name: 'Target',
              data: this.indicatorsdata.map((e: any) => +e?.kpi_target2030)
            }
          ],
          
          xaxis: {
            type: "category",
            categories: this.indicatorsdata.map((e: any) => e?.valueyear)

          },
          //colors: this.indicatorsdata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),
        
        });    
      });
      // ------------------------- //
      this.ds.param3Function('data/getindicatorvaluesbyindicatorid', goalid, districtid1, indicatorid).subscribe((res: any) => {
        this.indicatorsdata2 = res;
      
        this.chart2.updateOptions({
          series: [
            {
              name: 'Indicator Value',
              data: this.indicatorsdata2.map((e: any) => +e?.indicators_value)
            },
            {
              name: 'Target',
              data: this.indicatorsdata2.map((e: any) => +e?.kpi_target2030)
            }
          ],

          xaxis: {
            type: "category",
            categories: this.indicatorsdata2.map((e: any) => e?.valueyear)

          },
          //colors: this.indicatorsdata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),

        });
      });
    }   

  getcomparisondata1(goalid: any, indicator: any, district: any) {
    this.ds.param2Function('data/getmaxdisnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
      this.indicatormax = res;

      this.ds.param2Function('data/getcgnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
        this.indicatorcg = res;

        this.ds.param3Function('data/getdisnsbyindicatorid', goalid, indicator, district).subscribe((res: any) => {
          this.indicatordistrict = res;

          this.chart3.updateOptions({
            series: [
              {
                name: "Normalized Score (MAX)",
                data: this.indicatormax.map((e: any) => +e?.normalizevalue)
              },
              {
                name: "Normalized Score (CG)",
                data: this.indicatorcg.map((e: any) => +e?.NORMALISESCORE)
              },
              {
                name: "Normalized Score " + this.selecteddistrictname1,
                data: this.indicatordistrict.map((e: any) => +e?.normalizevalue)
              }
            ],
            xaxis: {
              type: "Category",
              categories: this.indicatormax.map((e: any) => e?.valueyear)

            },
            //colors: this.goaldata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),
          });
        });
      });
    });
  };

  getcomparisondata2(goalid: any, indicator: any, district: any) {
    this.ds.param2Function('data/getmaxdisnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
      this.indicatormax = res;

      this.ds.param2Function('data/getcgnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
        this.indicatorcg = res;

        this.ds.param3Function('data/getdisnsbyindicatorid', goalid, indicator, district).subscribe((res: any) => {
          this.indicatordistrict = res;

          this.chart4.updateOptions({
            series: [
              {
                name: "Normalized Score (MAX)",
                data: this.indicatormax.map((e: any) => +e?.normalizevalue)
              },
              {
                name: "Normalized Score (CG)",
                data: this.indicatorcg.map((e: any) => +e?.NORMALISESCORE)
              },
              {
                name: "Normalized Score " + this.selecteddistrictname2,
                data: this.indicatordistrict.map((e: any) => +e?.normalizevalue)
              }
            ],
            xaxis: {
              type: "Category",
              categories: this.indicatormax.map((e: any) => e?.valueyear)

            },
            //colors: this.goaldata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),
          });
        });
      });
    });
  };

  onDistrictSelected(event: any) {
    this.selecteddistrictcode = event.value;
    this.getdistrictname1(this.selecteddistrictcode);
    this.getindicatorvaluesChart(this.selectedgoal, this.selecteddistrictcode, this.selecteddistrictcode1,
      this.selectedindicator);
    this.getcomparisondata1(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
  
  }

  onDistrictSelected1(event: any) {
    this.selecteddistrictcode1 = event.value;
    this.getdistrictname2(this.selecteddistrictcode1);
    this.getindicatorvaluesChart(this.selectedgoal, this.selecteddistrictcode, this.selecteddistrictcode1,
      this.selectedindicator);
    this.getcomparisondata2(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
  }

  onGoalSelected(event: any) {
    this.selectedgoal = event.value;
    this.ds.paramFunction('common/getgoalwiseindicator', this.selectedgoal).subscribe((res: any) => {
      this.indicators = res;
      this.selectedindicator = this.indicators[0]?.indicator_master_id;
      this.districtcompare.get('indicators').setValue(+this.selectedindicator);//correct
      this.getindicatorvaluesChart(this.selectedgoal, this.selecteddistrictcode, this.selecteddistrictcode1,
        this.selectedindicator);
      this.getcomparisondata1(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
      this.getcomparisondata2(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode1); 
    });
    
  }

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    this.params = this.params.set("year", event.value);
    
  }

  onYearSelected1(event: any) {
    this.selectedyear1 = event.value;
    this.params = this.params.set("year1", event.value);
  }

}
