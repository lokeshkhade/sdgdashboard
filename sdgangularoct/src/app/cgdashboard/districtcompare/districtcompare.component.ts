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

@Component({
  selector: 'app-districtcompare',
  templateUrl: './districtcompare.component.html',
  styleUrls: ['./districtcompare.component.scss']
})
export class DistrictcompareComponent implements OnInit {

  @ViewChild("chart1") chart1!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;

  public year: any = [];
  public district: any = [];
  public goals: any = [];
  public goalvalues: any = [];
  public goalvaluesbaseyear: any = [];
  ////////////////////////////
  public cgyear: any;
  public selecteddistrictcode: any; public selecteddistrictname: any;
  public selectedyear: any;
  public previousyear: any;
  public params = new HttpParams();
  public colors: any = [];
  public datacurrentyear: any = [];
  public datapreviousyear: any = [];
  ///////////////////////////

  public districtcompare: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute) {
    this.districtcompare = this.fb.group({ //definition to cons
      valueyear: [+this.route.snapshot.paramMap.get('year'), Validators.required],
      district_name: [this.route.snapshot.paramMap.get('distid'), Validators.required]
    });

    // --------------------------------- //
   
    this.chartOptions = {
      series: [
        // {
        //   // name: "Normalize Score",
        //   // data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]
        // }
      ],      
      chart: {
        height: 350,
        type: "bar"
      },
      colors: [],
      plotOptions: {
        bar: {
          columnWidth: "98%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        title: {
          text: ""
        },
        labels: {
          rotate: -45
        },
        categories: [
          
        ],
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Goal Score"
        }
      },
      fill: {
       
        }
    };

    
  }//constructor-end

  ngOnInit(): void {

     this.selecteddistrictcode = this.route.snapshot.paramMap.get('distid');
     this.selectedyear = this.route.snapshot.paramMap.get('year');  
     this.previousyear = 2015; 
     this.getyear();
     this.getdistrict();
     this.getdistrictname();
     this.getdistrictwisenormalizescore(this.selecteddistrictcode, this.selectedyear);
     this.getdistrictwisepreviousnormalizescore(this.selecteddistrictcode, this.selectedyear); 
  }


  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;
    });
  }

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {
    this.selectedyear = event.value;
    this.getdistrictwisenormalizescore(this.selecteddistrictcode, this.selectedyear);
    this.getdistrictwisepreviousnormalizescore(this.selecteddistrictcode, this.selectedyear);
  }

  onDistrictSelected(event: any)
  {
    this.selecteddistrictcode = event.value;
    this.getdistrictwisenormalizescore(this.selecteddistrictcode, this.selectedyear);
    this.getdistrictwisepreviousnormalizescore(this.selecteddistrictcode, this.selectedyear);
  }

  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });
  }


  getdistrictname() {
    this.ds.paramFunction('common/getdistirctname', this.selecteddistrictcode).subscribe((res: any) => {
      this.selecteddistrictname = res[0].district_name;
    });
  }

  

  getdistrictwisenormalizescore(districtid: any, year: any,) {
    this.ds.param2Function('data/getdistrictwisenormalizescore', districtid,year).subscribe((res: any) => {
      this.goalvalues = res;
      this.chart1.updateOptions({
        series: [
          {
            name: 'GOALSCORE',
            data: this.goalvalues.map((e: any) => +e?.GOALSCORE)
          }
        ],
        xaxis: {
          type: "category",
          categories: this.goalvalues.map((e: any) => e?.goal_id)

        },
        //colors: this.goaldata.map((e: any) => (+e?.value >= 0 && +e?.value <= 49) ? "#dd1e47" : (e: any) => (+e?.value >= 50 && +e?.value <= 64) ? "#ffc40c" : "#00a084" ),
        colors: this.goalvalues.map((e: any) => {
          if (+e?.GOALSCORE >= 0 && +e?.GOALSCORE <= 49) {            
            return "#dd1e47"
          }
          else if (+e?.GOALSCORE >= 50 && +e?.GOALSCORE <= 64) {           
            return "#ffc40c"
          }
          else if (+e?.GOALSCORE >= 65 && +e?.GOALSCORE <= 99) {           
            return "#00a084"
          }
          else if (+e?.GOALSCORE >= 100) {
            return "#00aeef"
          }
        })
      });
    });
  }

  getdistrictwisepreviousnormalizescore(districtid: any, year: any,) {    
    //CHECK for BASE Year
    this.ds.param2Function('data/getdistrictwisenormalizescore', districtid, this.previousyear).subscribe((res: any) => {
      this.goalvaluesbaseyear = res;  
    });
  }

  setdata(goalid: any)
  {
    this.ds.param3Function('data/getnormalizedata', goalid, this.selectedyear, this.selecteddistrictcode).subscribe((res: any) => {
      this.datacurrentyear = res;
    });
    
  }

  setdatapreviousyear(goalid: any) {
    this.ds.param3Function('data/getnormalizedata', goalid, this.previousyear, this.selecteddistrictcode).subscribe((res: any) => {
      this.datapreviousyear = res;
    });

  }



}//last-one
