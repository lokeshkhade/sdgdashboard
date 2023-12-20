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

export type ChartOptions2 = {
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
  selector: 'app-districtgoalcompare',
  templateUrl: './districtgoalcompare.component.html',
  styleUrls: ['./districtgoalcompare.component.scss']
})
export class DistrictgoalcompareComponent implements OnInit {

  public year: any = [];
  public district: any = [];
  public goals: any = [];
  public indicators: any = [];
  public indicatorsdata: any = [];
  public indicatorsnordata: any = [];
  ////////////////////////////
  public selectedgoal: any;
  public selecteddistrictname: any;
  public selecteddistrictcode: any;
  public selectedyear: any;
  public selectedindicator: any;
  public params = new HttpParams();
  public colors: any = [];
  public indicatorlist: any = [];
  public indicatormetadata: any = [];
  public indicatorvalues: any = [];
  public indicatormax: any = [];
  public indicatormin: any = [];
  public indicatordistrict: any = [];
  public indicatorcg: any = [];
  ///////////////////////////
  @ViewChild("chart1") chart1!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;
  ///////////////////////////
  @ViewChild("chart2") chart2!: ChartOptions2;
  public chartOptions2: Partial<ChartOptions2> | any;

  public districtgoalcompare: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.districtgoalcompare = this.fb.group({ //definition to cons
      valueyear: [+this.route.snapshot.paramMap.get('year'), Validators.required],
      district_name: [this.route.snapshot.paramMap.get('distid'), Validators.required],  
      goal_id: [this.route.snapshot.paramMap.get('goalid'), Validators.required],
      indicators: ['', Validators.required]
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
            return  + val  ;
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.selectedgoal = this.route.snapshot.paramMap.get('goalid');
    this.selecteddistrictcode = this.route.snapshot.paramMap.get('distid');
    this.selectedyear = this.route.snapshot.paramMap.get('year');   
    this.getyear();
    this.getgoals();
    this.getindiactor(this.route.snapshot.paramMap.get('goalid'));    
    this.getdistrict();
    this.getdistrictname();
  }

  ///////////////////////////////////////////////////////////

  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;
    });
  }

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    this.getdistrict();
  }

  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });
  }
  

  getindiactor(goalid: any) {
    this.ds.paramFunction('common/getgoalwiseindicator', goalid).subscribe((res: any) => {
      this.indicators = res;
      this.districtgoalcompare.get('indicators').setValue(+this.indicators[0].indicator_master_id);//correct
      this.selectedindicator = this.indicators[0].indicator_master_id;
      this.getindicatorvalues(this.selectedgoal, this.selecteddistrictcode, this.selectedindicator);
      this.getindicatormetedata(this.selectedgoal, this.selectedindicator);
      this.getcomparisondata(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
      this.getmaxindicatordata(this.selectedgoal, this.selectedindicator);
      this.getminindicatordata(this.selectedgoal, this.selectedindicator);
      this.getcgindicatordata(this.selectedgoal, this.selectedindicator);
      this.getdistrictindicatordata(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
    });
    
  }

  onIndicatorSelected(event: any) {
    this.selectedindicator = event.value;
    this.getindicatorvalues(this.selectedgoal, this.selecteddistrictcode, this.selectedindicator);
    this.getindicatormetedata(this.selectedgoal, this.selectedindicator);   
    this.getmaxindicatordata(this.selectedgoal, this.selectedindicator);
    this.getminindicatordata(this.selectedgoal, this.selectedindicator);
    this.getcgindicatordata(this.selectedgoal, this.selectedindicator);
    this.getdistrictindicatordata(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode); 
    this.getcomparisondata(this.selectedgoal, this.selectedindicator, this.selecteddistrictcode);
  }

  getcomparisondata(goalid: any, indicator: any, district: any) 
  {
    this.ds.param2Function('data/getmaxdisnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
      this.indicatormax = res;

      this.ds.param2Function('data/getcgnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
        this.indicatorcg = res;

        this.ds.param3Function('data/getdisnsbyindicatorid', goalid, indicator, district).subscribe((res: any) => {
          this.indicatordistrict = res;

          this.chart2.updateOptions({
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
                name: "Normalized Score " + this.selecteddistrictname ,
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

   /////////////////////////////////////////////////////////
  

  getdistrictname() {
    this.ds.paramFunction('common/getdistirctname', this.selecteddistrictcode).subscribe((res: any) => {
      this.selecteddistrictname = res[0].district_name;
    });
  }

  getgoals() {
    this.ds.getData('common/getgoals').subscribe((res: any) => {
      this.goals = res;
    });
  }

  getindicatormetedata(goalid: any, indicator:any) {
    this.ds.param2Function('data/getindicatormetadatabyid', goalid, indicator).subscribe((res: any) => {
      this.indicatormetadata = res;
    });
  }


  getindicatorvalues(goalid: any, districtid: any, indicator :  any) {
    this.ds.param3Function('data/getindicatorvaluebyid', goalid, districtid, indicator).subscribe((res: any) => {
      this.indicatorvalues = res;
      this.chart1.updateOptions({
        series: [
          {
            name: "Indicator Value",
            data: this.indicatorvalues.map((e: any) => +e?.indicators_value)
          },
          {
            name: "Target Value",
            data: this.indicatorvalues.map((e: any) => +e?.kpi_target2030)
          }
        ],
        xaxis: {
          type: "Category",
          categories: this.indicatorvalues.map((e: any) => e?.valueyear)
        },
        //colors: this.goaldata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),       
      });

    });
  }

  // ----------------------

  getmaxindicatordata(goalid: any, indicator: any) {

  }

  getminindicatordata(goalid: any, indicator: any) {
    this.ds.param2Function('data/getmindisnsbyindicatorid', goalid, indicator).subscribe((res: any) => {
      this.indicatormin = res;
    });
  }

  getcgindicatordata(goalid: any, indicator: any) {

  }

  getdistrictindicatordata(goalid: any, indicator: any, district: any) {

  }

}//last-one
