import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

// ----------------------------------------------------- //

export type ChartOptions = {
  updateSeries(goal: any, value: any): unknown;
  updateOptions(arg0: { series: { name: string; data: any; }[]; xaxis: { type: string; categories: any; }; colors: string[] }): unknown;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
};

// -----------PIE-CHART------------//

export type ChartOptions1 = {
  updateSeries(goal: any, value: any): unknown;
  updateOptions(arg0: { series:any[]; colors: string[] }): unknown;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

// --------------------------------------------------------- //


@Component({
  selector: 'app-cgfull',
  templateUrl: './cgfull.component.html',
  styleUrls: ['./cgfull.component.scss']
})
export class CgfullComponent implements OnInit {  
 
  @ViewChild("chart2") chart2!: ChartOptions;
  public chartOptions: Partial<ChartOptions> | any;

  @ViewChild("chart1") chart1!: ChartOptions1;
  public chartOptions1: Partial<ChartOptions1> | any;

  colors: any = [  ]  
  public cgselectedYear: any;
  public maxYear: any;
  public cgyear: any = [];
  public tabledata: any = [];
  public compositescore: any = [];

  public params = new HttpParams();

  public goaldata: any = [];

  public districtgoaldata: any = []; 

  public district: any = [];
  public goals: any = [];

  public totaltarget: any = []; public totaldepartment: any = []; public totalindicators: any = [];

  public alltarget: any = []; public alldepartment: any = []; public allindicators: any = [];

  public cgmaindashboard: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService) 
  { 
    this.cgmaindashboard = this.fb.group({ //definition to cons
      valueyear: [+this.ds.currentyear.value, Validators.required]
    });   

    // ----------CHART-DIAGRAM---------------------- //
   
    this.chartOptions = {
      series: [  ],
      chart: {
        height: 350,
        type: "bar"
      },
      colors: [  ],
      plotOptions: {
        bar: {
          columnWidth: "75%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: true
      },
      xaxis: {
      }
    };

    // ----------------------//
    this.chartOptions1 = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      colors: [
        
      ],
      labels: ["Aspirant","Performer","FrontRunner","Achiever"],
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
  }

  //----------------------------------- //

  ngOnInit(): void { 
    //asynchronous-nature
    this.getmaxyear();
    this.getyear();  
    this.getgraphcompositescoreyearwise(+this.ds.currentyear.value);    
  }

///////////////////////////////////////////////////////////////////////

  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.cgyear = res;         
    });
  }

  getmaxyear() {
    this.ds.getData('common/getmaxyear').subscribe((res: any) => {      
      this.maxYear = res;
      this.params = this.params.set("maxyear", this.maxYear[0].maxyear);  
      
      this.getgraphcompositescoreyearwise(this.params.get("maxyear"));
      this.cgselectedYear = this.params.get("maxyear");
      this.getdepartment(); this.getindicators(); this.gettargets();
      this.getalltargets(); this.getallindicators(); this.getalldepartments();      
    });

   
  }

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {
    this.cgselectedYear = event.value;
    //this.params = this.params.set("year", event.value);
    this.ds.currentyear.next(event.value);
    this.ds.cgsetYear(this.cgselectedYear);
    this.getgraphcompositescoreyearwise(event.value);    
  }

  ////////////////////////////////////////////////////////////////////////
 
  getgraphcompositescoreyearwise(cgselectedyear : any) {
    this.ds.paramFunction('data/getcompositescoreyearwise', cgselectedyear).subscribe((res: any) => 
    {
      this.goaldata = res;
      this.chart2.updateOptions({
        series: [
          {
            name: 'Composite-Score',
            data: this.goaldata.map((e: any) => +e?.compositescore)
          }
        ],
        xaxis: {
          type: "category",
          categories: this.goaldata.map((e: any) => e?.district_name)

        },
        //colors: this.goaldata.map((e: any) => +e?.compositescore <= 49 ? "#dd1e47" : "#ffc40c"),//#00a084
        colors: this.goaldata.map((e: any) => {
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
        })
      }); 
    });

    // PIE-CHART//

    this.ds.paramFunction('data/getpercentcompositescoreyearwise', cgselectedyear).subscribe((res: any) => 
    {
        this.districtgoaldata = res;

        this.chart1.updateOptions({        
          series: [
            +this.districtgoaldata[0].Aspirant, +this.districtgoaldata[0].Performer, +this.districtgoaldata[0].FrontRunner, +this.districtgoaldata[0].Achiever     
          ],
      
        //colors: this.goaldata.map((e: any) => +e?.compositescore <= 49 ? "#dd1e47" : "#ffc40c"),//#00a084
        colors: ["#dd1e47", "#ffc40c", "#00a084", "#00aeef"]
       
      });

    });


  }

  // -----------------------------------------//

  getdepartment() {
    this.ds.getData('common/getdepartmentcount').subscribe((res: any) => {
      this.totaldepartment = res;
    });
  }

  gettargets() {
    this.ds.getData('common/getdiftargetcount').subscribe((res: any) => {
      this.totaltarget = res;
    });
  }

  getindicators() {
    this.ds.getData('common/getdifindicatorscount').subscribe((res: any) => {
      this.totalindicators = res;
    });
  }

  getalltargets() {
    this.ds.getData('common/getalldiftarget').subscribe((res: any) => {
      this.alltarget = res;
    });
  }

  getalldepartments() {
    this.ds.getData('common/getalldepartment').subscribe((res: any) => {
      this.alldepartment = res;
    });
  }

  getallindicators() {
    this.ds.getData('common/getalldifindicators').subscribe((res: any) => {
      this.allindicators = res;
    });
  }


}//final point
