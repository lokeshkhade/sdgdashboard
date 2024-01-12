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
  selector: 'app-districtdifentry',
  templateUrl: './districtdifentry.component.html',
  styleUrls: ['./districtdifentry.component.scss']
})

export class DistrictdifentryComponent implements OnInit 
{
  
  public districtdifentry: FormGroup; //add  FormGroup 
  public deptname: any;  public districtname: any;  public currentUser: any;
  public deptid: any; public districtid: any;
  public user_id: any; public message: any;
  public years: any = [];  public freezinfo: any = [];
  public indicators: any = []; public selectedyear: any; public currentdate: any; public freezto: any;
  isEditMode: boolean = false;  isSaveMode: boolean = false;
  data: Object; 
  ///////////////////////////

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService, private dp: DatePipe) {
    this.districtdifentry = this.fb.group({ //definition to cons
      valueyear: [],
      district: [],
      diffentry: new FormArray([])
    });    
  }


  ngOnInit(): void 
  {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.deptid = this.currentUser.departmentid ;
    this.districtid = this.currentUser.districtcode; 
    this.getdeptname(this.currentUser.departmentid);
    this.getdistrictname(this.currentUser.districtcode);   
    this.getallyears();
    this.message = ""; this.selectedyear = ""
    this.currentdate = this.dp.transform(new Date().toISOString(), 'yyyy-MM-dd');
  }

  getallyears() 
  {
    this.ds.getData('common/getallyears').subscribe((res: any) => {
      this.years = res;
    });
  }

  onYearSelected(event: any) 
  {
    this.selectedyear = event.value;    
  }

  get f() { return this.districtdifentry.controls; }
  get t() { return this.f['diffentry'] as FormArray; }

  getindicator(deptid: any) 
  {
    this.ds.paramFunction('common/getdeptindicator', deptid).subscribe((res: any) => {
      this.indicators = res;
      for (let i = 0; i < this.indicators.length; i++) {
        this.t.push(this.fb.group({
          district_indicator_master_id: this.indicators[i].indicator_master_id,
          indicators_value: ['', [Validators.required]]
        }));      
      }     
    });
  }

  getdeptname(deptid: any) 
  {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].department_name;
    });
  }

  getdistrictname(districtid: any) 
  {
    this.ds.paramFunction('common/getdistirctname', districtid).subscribe((res: any) => {
      this.districtname = res[0].district_name;
    });
  }  

  isValidInput(fieldName: any): boolean {
    return this.districtdifentry.controls[fieldName].invalid &&
      (this.districtdifentry.controls[fieldName].dirty || this.districtdifentry.controls[fieldName].touched);
  }

  reset() {
    window.location.reload();
  }  

  showdatapoint()
  {
    if(this.selectedyear == "")
    {
      Swal.fire({
        icon: "info",
        text: 'Please Select a Year',
        timer: 5000
      });
    }
    else
    {
      this.ds.param3Function('common/getfreezinfo', this.districtid, this.deptid, this.selectedyear).subscribe((res: any) => {
        this.freezinfo = res;
        this.freezto = this.dp.transform(new Date(this.freezinfo[0]?.freezeto).toISOString(), 'yyyy-MM-dd');
        if ((moment(this.currentdate).isBefore(this.freezto)) || (moment(this.freezto).isSame(this.currentdate))) 
        {
          this.message = "Data is Unfreeze";

          this.ds.param3Function('common/getdifvaluesbyyear', this.districtid, this.deptid, this.selectedyear).subscribe((res: any) => {
            this.indicators = res;
            if (this.indicators == 'Data Not Found') //Check 
            {
              this.isEditMode = false;
              this.isSaveMode = true;
              this.t.clear();
              this.ds.paramFunction('common/getdeptindicator', this.deptid).subscribe((res: any) => {
                this.indicators = res;
                for (let i = 0; i < this.indicators.length; i++) 
                {
                  this.t.push(this.fb.group({
                    district_indicator_master_id: this.indicators[i].indicator_master_id,
                    indicators_value: this.indicators[i].indicators_value
                  }));
                }
              });
            }
            else 
            {
              this.isEditMode = true;
              this.isSaveMode = false;
              this.t.clear();
              for (let i = 0; i < this.indicators.length; i++) 
              {
                this.t.push(this.fb.group({
                  district_indicator_master_id: this.indicators[i].indicator_master_id,
                  indicators_value: this.indicators[i].indicators_value
                }));
              }
            }
          });
        }
        else if ((moment(this.currentdate).isAfter(this.freezto))) 
        {
          this.message = "Data is Freeze";
          this.ds.param3Function('common/getdifvaluesbyyear', this.districtid, this.deptid, this.selectedyear).subscribe((res: any) => {
            this.indicators = res;
            if (this.indicators == 'Data Not Found') {
              this.isEditMode = false;
              this.isSaveMode = false;
              this.t.clear();
              this.ds.paramFunction('common/getdeptindicator', this.deptid).subscribe((res: any) => {
                this.indicators = res;
                for (let i = 0; i < this.indicators.length; i++) {
                  this.t.push(this.fb.group({
                    district_indicator_master_id: this.indicators[i].indicator_master_id,
                    indicators_value: this.indicators[i].indicators_value
                  }));
                }
              });
            }
            else 
            {
              this.isEditMode = false;
              this.isSaveMode = false;
              this.t.clear();
              for (let i = 0; i < this.indicators.length; i++) {
                this.t.push(this.fb.group({
                  district_indicator_master_id: this.indicators[i].indicator_master_id,
                  indicators_value: this.indicators[i].indicators_value
                }));
              }
            }
          });
        }
        else {
          this.message = "Data is not available";
        }
      });      
    }    
  }



  onSubmit() 
  {
    this.districtdifentry.patchValue
    ({
        valueyear: this.selectedyear,
        district: this.districtid
    });
    this.ds.postData('crud/difinsert', this.districtdifentry.value).subscribe(res => 
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
    this.districtdifentry.reset();
    this.isEditMode = false;
    this.isSaveMode = false;
  }

  // --------------------------------------------------- //

  onUpdate() 
  {
    this.districtdifentry.patchValue
      ({
        valueyear: this.selectedyear,
        district: this.districtid
    });
    this.ds.updateData('crud/difinsert', this.districtdifentry.value).subscribe(res => 
      {
        this.data = res;
        if (this.data) 
        {
          Swal.fire({
            icon: "success",
            text: 'Data Updated Succesfully',
            timer: 2000
          });
        }
        else 
        {
          Swal.fire({
            icon: "error",
            text: 'Please Check.....',
            timer: 2000
          });
        }      
    });
    this.districtdifentry.reset();
    this.isEditMode = false;
    this.isSaveMode = false;
  }



 

}//last-line
