import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-deptcgdifentry',
  templateUrl: './deptcgdifentry.component.html',
  styleUrls: ['./deptcgdifentry.component.scss']
})
export class DeptcgdifentryComponent implements OnInit {


  public statedifentry: FormGroup; //add  FormGroup 
  public deptname: any;  public currentUser: any;
  public deptid: any; 
  public user_id: any; public message: any; 
  public years: any = []; public freezinfo: any = [];
  public indicators: any = []; public selectedyear: any; public currentdate: any; public freezto: any;
  isEditMode: boolean = false; isSaveMode: boolean = false;
  data: Object;
  ///////////////////////////

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService, private dp: DatePipe) {
    this.statedifentry = this.fb.group({ //definition to cons
      cg_year: [],
      diffentry: new FormArray([])
    });
  }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.deptid = this.currentUser.departmentid;
    this.getdeptname(this.deptid);
    this.getallyears();
    this.message = ""; this.selectedyear = ""; 
    this.currentdate = this.dp.transform(new Date().toISOString(), 'yyyy-MM-dd');
  }

  getallyears() {
    this.ds.getData('common/getallyears').subscribe((res: any) => {
      this.years = res;
    });
  }



  onYearSelected(event: any) {
    this.selectedyear = event.value;
  }

  get f() { return this.statedifentry.controls; }
  get t() { return this.f['diffentry'] as FormArray; }

  getindicator(deptid: any) {
    this.ds.paramFunction('common/getdeptindicator', deptid).subscribe((res: any) => {
      this.indicators = res;
      for (let i = 0; i < this.indicators.length; i++) {
        this.t.push(this.fb.group({
          district_indicator_master_id: this.indicators[i].indicator_master_id,
          goal_id: this.indicators[i].goal_id,
          indicator_desc: this.indicators[i].district_indicator_desc,
          cg_value: ['', [Validators.required]]
        }));
      }
    });
  }

  getdeptname(deptid: any) {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].department_name;
    });
  }


  isValidInput(fieldName: any): boolean {
    return this.statedifentry.controls[fieldName].invalid &&
      (this.statedifentry.controls[fieldName].dirty || this.statedifentry.controls[fieldName].touched);
  }

  reset() {
    window.location.reload();
  }

  showdatapoint() {
    if (this.selectedyear == "") {
      Swal.fire({
        icon: "info",
        text: 'Please Select a Year',
        timer: 5000
      });
    }   
    else {
      this.ds.param2Function('common/getcgdifvaluesbyyear', this.deptid, this.selectedyear).subscribe((res: any) => {
        this.indicators = res;
        if (this.indicators == 'Data Not Found') //Check 
        {
          this.isEditMode = false;
          this.isSaveMode = true;
          this.t.clear();
          this.ds.paramFunction('common/getdeptindicator', this.deptid).subscribe((res: any) => {
            this.indicators = res;
            for (let i = 0; i < this.indicators.length; i++) {
              this.t.push(this.fb.group({
                district_indicator_master_id: this.indicators[i].indicator_master_id,
                cg_value: this.indicators[i].cg_value,
                goal_id: this.indicators[i].goal_id,
                indicator_desc: this.indicators[i].district_indicator_desc
              }));
            }
          });
        }
        else {
          this.isEditMode = true;
          this.isSaveMode = false;
          this.t.clear();
          for (let i = 0; i < this.indicators.length; i++) {
            this.t.push(this.fb.group({
              district_indicator_master_id: this.indicators[i].indicator_master_id,
              cg_value: this.indicators[i].cg_value,
              goal_id: this.indicators[i].goal_id,
              indicator_desc: this.indicators[i].district_indicator_desc
            }));
          }
        }
      });
    }
  }



  onSubmit() 
  {
    this.statedifentry.patchValue
    ({
        cg_year: this.selectedyear
    });
    this.ds.postData('crud/statedifinsert', this.statedifentry.value).subscribe(res => 
    {
      this.data = res;
      if (this.data) 
      {
        Swal.fire({
          icon: "success",
          text: 'Data Saved Succesfully',
          timer: 2000
        });
      }
    });
    this.statedifentry.reset();
    this.isEditMode = false;
    this.isSaveMode = false;
  }

  // --------------------------------------------------- //

  onUpdate() 
  {
    this.statedifentry.patchValue
      ({
        cg_year: this.selectedyear
      });
    this.ds.updateData('crud/statedifinsert', this.statedifentry.value).subscribe(res => {
      this.data = res;
      if (this.data) {
        Swal.fire({
          icon: "success",
          text: 'Data Updated Succesfully',
          timer: 2000
        });
      }
      else {
        Swal.fire({
          icon: "error",
          text: 'Please Check.....',
          timer: 2000
        });
      }
    });
    this.statedifentry.reset();
    this.isEditMode = false;
    this.isSaveMode = false;
  }
}
