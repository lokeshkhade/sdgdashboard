import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexPlotOptions, ApexStroke, 
  ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, 
  ChartComponent } from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive, ApexMarkers, 
  ApexGrid
 } from "ng-apexcharts";
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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

@Component({
  selector: 'app-districtdashboard',
  templateUrl: './districtdashboard.component.html',
  styleUrls: ['./districtdashboard.component.scss']
})
export class DistrictdashboardComponent implements OnInit {

  // @ViewChild("chart1") chart1!: ChartOptions;

  @ViewChildren('chart1') chart1!: QueryList<ChartOptions>;

  public chartOptions: Partial<ChartOptions> | any;
 
  public year: any = [];
  public district: any = [];
  public goals: any = [];

  public indicatordata: any = [];

  public indicatorlist: any = [];

  public indicatormetadata: any = [];

  public indicatorvalues: any = [];

  public indicatorchart: any = [];

  public datatest: any ;

  ////////////////////////////
  public cgyear: any;
  public selecteddistrictcode: any; public selecteddistrictname: any;
  public selectedyear: any;
  public selectedgoal: any;
  public params = new HttpParams();
  ///////////////////////////
  public temp = [
    
  ]

  public xaxis = [
   
  ];


  ////////////////////////////

  public districtdashboard: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.districtdashboard = this.fb.group({ //definition to cons
      valueyear: [2021, Validators.required]
    });

    this.chartOptions = {
      series: [
        // {
        //   name: "Target",
        //   data: [28, 29, 33, 36, 32, 32, 33]
        // },
        // {
        //   name: "Indicator Values",
        //   data: [12, 11, 14, 18, 17, 13, 13]
        // }
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
  }//constructor-end

  ngOnInit(): void {

    this.selecteddistrictcode = this.route.snapshot.paramMap.get('distid');
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.selectedgoal = this.route.snapshot.paramMap.get('goalid');
    this.getyear();
    this.getdistrict();
    this.getgoals(); this.getdistrictname();
    this.params = this.params.set("cgyear1", this.selectedyear);

    this.getindicatormetedata(this.selectedgoal);

    this.getindicatorvalues(this.selectedgoal, this.selecteddistrictcode);

    this.getindicatorvaluesChart(this.selectedgoal, this.selecteddistrictcode);

  }


  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;
    });
  }

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    this.params = this.params.set("cgyear1", event.value);
    this.ds.cgsetYear(this.selectedyear);
    this.getdistrict();
  }

  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });
  }

  
  getdistrictname()
  {
    this.ds.paramFunction('common/getdistirctname', this.selecteddistrictcode).subscribe((res: any) => {
      this.selecteddistrictname = res[0].district_name;      
    });
  }

  getgoals() {
    this.ds.getData('common/getgoals').subscribe((res: any) => {
      this.goals = res;
    });
  }

  getindicatormetedata(goalid:any) {
      this.ds.paramFunction('data/getindicatormetadata', goalid).subscribe((res: any) => {
      this.indicatormetadata = res;
    });
  }

  getindicatorvalues(goalid: any,districtid: any ) {
    this.ds.param2Function('data/getindicatorvalues', goalid, districtid).subscribe((res: any) => {
      this.indicatorvalues = res;
    });
  }


  getindicatorvaluesChart(goalid: any, districtid: any) {
    
    this.ds.paramFunction('data/getindicatormetadata', goalid).subscribe((res: any) => {
      this.indicatormetadata = res;
      console.log("Check",this.indicatormetadata);
      var year; var value; var target;
     
      for (let entry of this.indicatormetadata) 
      {       
        setTimeout(() => {  
        this.ds.param3Function('data/getindicatorvaluesbyindicatorid', goalid, districtid, entry.indicator_master_id).subscribe((res: any) => {
         this.indicatorchart = res;
        
          //console.log(entry.indicator_master_id, this.indicatorchart[0].district_indicator_master_id)

          year = {
            categories: [this.indicatorchart[0].valueyear, this.indicatorchart[1].valueyear, this.indicatorchart[2].valueyear]
          },

          value =
            [{
              "name": "Target",
              "data": [
                this.indicatorchart[0].kpi_target2030,
                this.indicatorchart[1].kpi_target2030,
                this.indicatorchart[2].kpi_target2030

              ]
            },
            {
              "name": "Indicator Values",
              "data": [
                this.indicatorchart[0].indicators_value,
                this.indicatorchart[1].indicators_value,
                this.indicatorchart[2].indicators_value
              ]

            }]
          this.xaxis.push(year);
          this.temp.push(value);
        });
        }, 300);       
      }//loop-end 
    });
  }
}
