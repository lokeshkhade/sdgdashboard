import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deptlanding',
  templateUrl: './deptlanding.component.html',
  styleUrls: ['./deptlanding.component.scss']
})
export class DeptlandingComponent implements OnInit {

  public dashboardall: FormGroup; //add  FormGroup 
  public indicators: any = [];  public indicatorvalue: any = []; 
  public selectedindicator: any;  public selecteddept: any;   public deptname: any; public deptdata: any = []; public deptdistscore: any = [];
  public currentUser: any;  public user_id: any;
  public years: any = [];  public selectedyear: any;

  public DPT01: any;  public DPT02: any;   public DPT03: any;  public DPT04: any;
  public DPT05: any;  public DPT06: any;   public DPT07: any;  public DPT08: any;
  public DPT09: any;  public DPT10: any;   public DPT11: any;  public DPT12: any;
  public DPT13: any;  public DPT14: any;   public DPT15: any;  public DPT16: any;
  public DPT17: any;  public DPT18: any;   public DPT19: any;  public DPT20: any;
  public DPT21: any;  public DPT22: any;   public DPT23: any;
  /////////////////////
  public DT01: any;   public DT01T: any; public DT02: any;   public DT02T: any;  public DT03: any;  public DT03T: any;  public DT04: any;  public DT04T: any;  public DT05: any;  public DT05T: any;  public DT06: any;
  public DT06T: any;  public DT07: any;  public DT07T: any;  public DT08: any;  public DT08T: any;  public DT09: any;  public DT09T: any;  public DT10: any;
  public DT10T: any;  public DT11: any;  public DT11T: any;  public DT12: any;  public DT12T: any;  public DT13: any;  public DT13T: any;  public DT14: any;
  public DT14T: any;  public DT15: any;  public DT15T: any;  public DT16: any;  public DT16T: any;  public DT17: any;  public DT17T: any;  public DT18: any;
  public DT18T: any;  public DT19: any;  public DT19T: any;  public DT20: any;  public DT20T: any;  public DT21: any;  public DT21T: any;  public DT22: any;
  public DT22T: any;  public DT23: any;  public DT23T: any;  public DT24: any;  public DT24T: any;  public DT25: any;  public DT25T: any;  public DT26: any;
  public DT26T: any;  public DT27: any;  public DT27T: any;  public DT28: any;  public DT28T: any;  public DT29: any;  public DT29T: any;


  constructor(private fb: FormBuilder, private ds: DataService, private datePipe: DatePipe, private authService: AuthService) 
  {
    this.dashboardall = this.fb.group({ //definition to cons
      valueyear: [2015, Validators.required]
    });
  }


  ngOnInit(): void 
  {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getdeptname(this.currentUser.departmentid);
    this.selectedyear=2015;
    this.selecteddept = this.currentUser.departmentid;
    this.getdeptscore(this.selectedyear);
    this.getcgmapindicator(this.selectedyear, this.currentUser.departmentid);
    this.getallyears();
    this.getindicator(this.currentUser.departmentid);
    this.DT29 = '#FFFFFF'; this.DT28 = '#FFFFFF';
  }

  getallyears() {
    this.ds.getData('common/getdifyears').subscribe((res: any) => {
      this.years = res;
    });
  }

  onYearSelected(event: any) 
  {
    this.selectedyear = event.value;
    this.getdeptscore(this.selectedyear);
    this.getcgmapindicator(this.selectedyear,this.selecteddept);
  }

  getdeptscore(year: any) 
  {
    this.ds.paramFunction('common/getdeptscorebyyear', year).subscribe((res: any) => {
      this.deptdata = res;
      for (var index in res) {
        if (res[index].dept_id == 11) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT01='#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT01='#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT01='#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT01='#00aeef';
          }
        }

        if (res[index].dept_id == 12) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT02 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT02 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT02 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT02 = '#00aeef';
          }
        }

        if (res[index].dept_id == 13) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT03 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT03 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT03 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT03 = '#00aeef';
          }
        }

        if (res[index].dept_id == 14) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT04 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT04 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT04 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT04 = '#00aeef';
          }
        }

        if (res[index].dept_id == 15) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT05 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT05 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT05 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT05 = '#00aeef';
          }
        }

        if (res[index].dept_id == 16) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT06 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT06 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT06 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT06 = '#00aeef';
          }
        }

        if (res[index].dept_id == 17) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT07 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT07 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT07 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT07 = '#00aeef';
          }
        }

        if (res[index].dept_id == 18) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT08 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT08 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT08 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT08 = '#00aeef';
          }
        }

        if (res[index].dept_id == 19) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT09 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT09 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT09 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT09 = '#00aeef';
          }
        }

        if (res[index].dept_id == 20) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT10 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT10 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT10 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT10 = '#00aeef';
          }
        }

        if (res[index].dept_id == 21) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT11 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT11 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT11 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT11 = '#00aeef';
          }
        }

        if (res[index].dept_id == 22) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT12 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT12 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT12 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT12 = '#00aeef';
          }
        }

        if (res[index].dept_id == 23) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT13 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT13 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT13 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT13 = '#00aeef';
          }
        }

        if (res[index].dept_id == 24) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT14 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT14 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT14 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT14 = '#00aeef';
          }
        }

        if (res[index].dept_id == 25) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT15 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT15 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT15 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT15 = '#00aeef';
          }
        }

        if (res[index].dept_id == 26) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT16 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT16 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT16 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT16 = '#00aeef';
          }
        }

        if (res[index].dept_id == 27) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT17 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT17 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT17 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT17 = '#00aeef';
          }
        }

        if (res[index].dept_id == 28) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT18 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT18 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT18 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT18 = '#00aeef';
          }
        }

        if (res[index].dept_id == 29) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT19 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT19 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT19 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT19 = '#00aeef';
          }
        }

        if (res[index].dept_id == 30) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT20 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT20 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT20 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT20 = '#00aeef';
          }
        }

        if (res[index].dept_id == 31) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT21 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT21 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT21 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT21 = '#00aeef';
          }
        }

        if (res[index].dept_id == 32) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT22 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT22 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT22 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT22 = '#00aeef';
          }
        }

        if (res[index].dept_id == 33) {
          if (res[index].dept_wise_score <= 49) {
            this.DPT23 = '#dd1e47';
          }
          else if (res[index].dept_wise_score >= 50 && res[index].dept_wise_score <= 64) {
            this.DPT23 = '#ffc40c';
          }
          else if (res[index].dept_wise_score >= 65 && res[index].dept_wise_score <= 99) {
            this.DPT23 = '#00a084';
          }
          else if (res[index].dept_wise_score >= 100) {
            this.DPT23 = '#00aeef';
          }
        }
       
      }
      
    });
  }  

  getdeptname(deptid: any) 
  {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].description;
    });
  }


  getindicator(deptid: any) 
  {
    this.ds.paramFunction('common/getdeptindicator', deptid).subscribe((res: any) => {
      this.indicators = res;
      this.selectedindicator = this.indicators[0]?.indicator_master_id;     
    });
  } 

  isValidInput(fieldName: any): boolean {
    return this.dashboardall.controls[fieldName].invalid &&
      (this.dashboardall.controls[fieldName].dirty || this.dashboardall.controls[fieldName].touched);
  }

  reset() 
  {
    window.location.reload();
  }

  getcgmapindicator(year:any,dept:any) 
  {
    this.ds.param2Function('common/getdeptdistscorebyyear', year, dept).subscribe((res: any) => {
      for (var index in res) 
      {
        if (res[index].district_code == "DT01") {
          if (res[index].score <= 49) {
            this.DT01 = '#dd1e47';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT01 = '#ffc40c';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT01 = '#00a084';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT01 = '#00aeef';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT02") {
          if (res[index].score <= 49) {
            this.DT02 = '#dd1e47';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT02 = '#ffc40c';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT02 = '#00a084';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT02 = '#00aeef';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT03") {
          if (res[index].score <= 49) {
            this.DT03 = '#dd1e47';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT03 = '#ffc40c';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT03 = '#00a084';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT03 = '#00aeef';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT04") {
          if (res[index].score <= 49) {
            this.DT04 = '#dd1e47';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT04 = '#ffc40c';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT04 = '#00a084';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT04 = '#00aeef';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT05") {
          if (res[index].score <= 49) {
            this.DT05 = '#dd1e47';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT05 = '#ffc40c';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT05 = '#00a084';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT05 = '#00aeef';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT06") {
          if (res[index].score <= 49) {
            this.DT06 = '#dd1e47';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT06 = '#ffc40c';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT06 = '#00a084';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT06 = '#00aeef';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT07") {
          if (res[index].score <= 49) {
            this.DT07 = '#dd1e47';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT07 = '#ffc40c';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT07 = '#00a084';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT07 = '#00aeef';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT08") {
          if (res[index].score <= 49) {
            this.DT08 = '#dd1e47';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT08 = '#ffc40c';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT08 = '#00a084';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT08 = '#00aeef';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT09") {
          if (res[index].score <= 49) {
            this.DT09 = '#dd1e47';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT09 = '#ffc40c';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT09 = '#00a084';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT09 = '#00aeef';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT10") {
          if (res[index].score <= 49) {
            this.DT10 = '#dd1e47';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT10 = '#ffc40c';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT10 = '#00a084';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT10 = '#00aeef';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT11") {
          if (res[index].score <= 49) {
            this.DT11 = '#dd1e47';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT11 = '#ffc40c';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT11 = '#00a084';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT11 = '#00aeef';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT12") {
          if (res[index].score <= 49) {
            this.DT12 = '#dd1e47';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT12 = '#ffc40c';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT12 = '#00a084';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT12 = '#00aeef';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT13") {
          if (res[index].score <= 49) {
            this.DT13 = '#dd1e47';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT13 = '#ffc40c';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT13 = '#00a084';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT13 = '#00aeef';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT14") {
          if (res[index].score <= 49) {
            this.DT14 = '#dd1e47';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT14 = '#ffc40c';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT14 = '#00a084';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT14 = '#00aeef';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT15") {
          if (res[index].score <= 49) {
            this.DT15 = '#dd1e47';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT15 = '#ffc40c';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT15 = '#00a084';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT15 = '#00aeef';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT16") {
          if (res[index].score <= 49) {
            this.DT16 = '#dd1e47';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT16 = '#ffc40c';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT16 = '#00a084';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT16 = '#00aeef';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT17") {
          if (res[index].score <= 49) {
            this.DT17 = '#dd1e47';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT17 = '#ffc40c';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT17 = '#00a084';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT17 = '#00aeef';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT18") {
          if (res[index].score <= 49) {
            this.DT18 = '#dd1e47';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT18 = '#ffc40c';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT18 = '#00a084';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT18 = '#00aeef';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT19") {
          if (res[index].score <= 49) {
            this.DT19 = '#dd1e47';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT19 = '#ffc40c';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT19 = '#00a084';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT19 = '#00aeef';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT20") {
          if (res[index].score <= 49) {
            this.DT20 = '#dd1e47';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT20 = '#ffc40c';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT20 = '#00a084';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT20 = '#00aeef';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT21") {
          if (res[index].score <= 49) {
            this.DT21 = '#dd1e47';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT21 = '#ffc40c';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT21 = '#00a084';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT21 = '#00aeef';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT22") {
          if (res[index].score <= 49) {
            this.DT22 = '#dd1e47';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT22 = '#ffc40c';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT22 = '#00a084';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT22 = '#00aeef';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT23") {
          if (res[index].score <= 49) {
            this.DT23 = '#dd1e47';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT23 = '#ffc40c';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT23 = '#00a084';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT23 = '#00aeef';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT24") {
          if (res[index].score <= 49) {
            this.DT24 = '#dd1e47';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT24 = '#ffc40c';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT24 = '#00a084';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT24 = '#00aeef';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT25") {
          if (res[index].score <= 49) {
            this.DT25 = '#dd1e47';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT25 = '#ffc40c';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT25 = '#00a084';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT25 = '#00aeef';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT26") {
          if (res[index].score <= 49) {
            this.DT26 = '#dd1e47';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT26 = '#ffc40c';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT26 = '#00a084';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT26 = '#00aeef';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

        if (res[index].district_code == "DT27") {
          if (res[index].score <= 49) {
            this.DT27 = '#dd1e47';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 50 && res[index].score <= 64) {
            this.DT27 = '#ffc40c';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 65 && res[index].score <= 99) {
            this.DT27 = '#00a084';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].score;
          }
          else if (res[index].score >= 100) {
            this.DT27 = '#00aeef';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].score;
          }
        }

      }//for
    });//
  }//function-end


  getinddata(dept_id :  any)
  {
    this.getindicator(dept_id);
    this.getdeptname(dept_id);
    this.getcgmapindicator(this.selectedyear, dept_id);
  }

}
