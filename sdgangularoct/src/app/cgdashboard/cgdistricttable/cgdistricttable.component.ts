import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApexAxisChartSeries, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

@Component({
  selector: 'app-cgdistricttable',
  templateUrl: './cgdistricttable.component.html',
  styleUrls: ['./cgdistricttable.component.scss']
})
export class CgdistricttableComponent implements OnInit {

  public cgselectedYear: any;
  public year: any = [];
  public tabledata: any = [];
  public compositescore: any = [];

  public goaldata: any = [];
  public district: any = [];
  public goals: any = [];

  public indicatordata: any = [];

  public indicatorlist: any = [];

  ////////////////////////////
  public cgyear: any;
  public selecteddistrictcode: any;
  public selectedyear: any;
  public params = new HttpParams();
  ///////////////////////////

  public cgdistricttable: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router,private route: ActivatedRoute) {
    
    this.cgdistricttable = this.fb.group({ //definition to cons
      valueyear: [2021, Validators.required]
    });
  }


  ngOnInit(): void {  
    
    this.selecteddistrictcode = this.route.snapshot.paramMap.get('distid');
    this.selectedyear = this.route.snapshot.paramMap.get('year');
    this.cgdistricttable.get('valueyear').setValue(+this.selectedyear);//correct
    // this.cgdistricttable.controls['valueyear'].patchValue(this.selectedyear);
    // this.cgdistricttable.controls['valueyear'].setValue(this.selectedyear);

    this.cgselectedYear = this.selectedyear;   
    this.getyear();   
    this.getdistrict();
    this.getgoals();   
    this.params = this.params.set("cgyear1", this.cgselectedYear);
    this.districttabledata();   
  }

 
  getyear() {
    this.ds.getData('data/getcgdashboardyear').subscribe((res: any) => {
      this.year = res;      
    });
  }

  /////////////////////////////////////////////////////////

  onYearSelected(event: any) {    
    this.cgselectedYear = event.value;
    this.params = this.params.set("cgyear1", event.value);
    this.ds.cgsetYear(this.cgselectedYear);
    this.getdistrict();
    this.districttabledata();    
  }


  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });
  }

  getgoals() {
    this.ds.getData('common/getgoals').subscribe((res: any) => {
      this.goals = res;
    });
  }


  districttabledata()
  {    
    this.ds.paramFunction('data/getcggoalscoreyearwise', this.params.get("cgyear1")).subscribe((res: any) => {
      this.tabledata = res;     
      this.ds.paramFunction('data/getcompositescoreyearwise', this.params.get("cgyear1")).subscribe((res: any) => {
        this.compositescore = res;
      });
    });

  }

  sortdatabyCompositeScore() {    
    this.tabledata = "";
    this.compositescore = "";
    this.ds.paramFunction('data/getcggoalscoreyearwise', this.params.get("cgyear1")).subscribe((res: any) => {
      this.tabledata = res;
      this.ds.paramFunction('data/getcompositescoreyearwisesortname', this.params.get("cgyear1")).subscribe((res: any) => {
        this.compositescore = res;
      });
    });
  }

  sortdatabyDistrict() {
    this.tabledata = "";
    this.compositescore = "";
    this.ds.paramFunction('data/getcggoalscoreyearwise', this.params.get("cgyear1")).subscribe((res: any) => {
      this.tabledata = res;
      this.ds.paramFunction('data/getcompositescoreyearwise', this.params.get("cgyear1")).subscribe((res: any) => {
        this.compositescore = res;
      });
    });
  }

  getgoalid(goal_id:any)
  {
    this.ds.paramFunction('common/getgoalwiseindicator', goal_id).subscribe((res: any) => {
      this.indicatorlist = res;      
    });

    this.ds.param2Function('data/getnormalizescoreindicatorgolawise',this.params.get("cgyear1"), goal_id,).subscribe((res: any) => {
      this.indicatordata = res;
      //console.log(this.indicatordata);
    });
  }

}//final point
