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
  selector: 'app-freezdata',
  templateUrl: './freezdata.component.html',
  styleUrls: ['./freezdata.component.scss']
})
export class FreezdataComponent implements OnInit 
{

  public freezunfreezform: FormGroup; //add  FormGroup 
  public departments: any = [];  public districts: any = [];
  public years: any = [];

  public selectedyear: any; public data: any = [];
  public selecteddept: any; public selecteddistrict: any;  public freezefrom: any; public freezeto: any;
  public today = new Date(); public currentUser: any; public username: any;


  constructor(private fb: FormBuilder, private ds: DataService, private dp: DatePipe, private authService: AuthService) 
  {
    this.freezunfreezform = this.fb.group({ //definition to cons
      department_id: ['', Validators.required],
      districtcode: ['', Validators.required],
      dif_year: ['', Validators.required],
      freezefrom: ['', Validators.required],
      freezeto: ['', Validators.required],
      createdby: [''],
      freezeflag: ['']     
    });
  }

  ngOnInit(): void 
  {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.username = user.username;
    this.getalldepartments();
    this.getalldistrict();
    this.getallyears();
  }

  getalldistrict() 
  {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.districts = res;
    });
  }

  getalldepartments() 
  {
    this.ds.getData('common/getalldepartment').subscribe((res: any) => {
      this.departments = res;
    });
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

  onDepartmentSelected(event: any) 
  {
    this.selecteddept = event.value;
  }

  onDistrictSelected(event: any) 
  {
    this.selecteddistrict = event.value;
  }

  isValidInput(fieldName: any): boolean 
  {
    return this.freezunfreezform.controls[fieldName].invalid &&
      (this.freezunfreezform.controls[fieldName].dirty || this.freezunfreezform.controls[fieldName].touched);
  }  

  reset() 
  {
    window.location.reload();
  }

  onSubmit() 
  {
    this.freezefrom == "";
    this.freezeto == "";

    this.freezefrom = this.dp.transform(this.freezunfreezform.get("freezefrom")?.value, "yyyy-MM-dd");
    this.freezeto = this.dp.transform(this.freezunfreezform.get("freezeto")?.value, "yyyy-MM-dd");

    if (this.freezefrom == null || this.freezeto == null || this.freezefrom == "" || this.freezeto == "") {
      Swal.fire({
        icon: "error",
        text: 'Please select both unfreezefrom and unfreezeto date',
        timer: 3000
      });
    }
    else {
      this.freezunfreezform.patchValue({
        freezefrom: this.dp.transform(this.freezunfreezform.get("freezefrom")?.value, "yyyy-MM-dd"),
        freezeto: this.dp.transform(this.freezunfreezform.get("freezeto")?.value, "yyyy-MM-dd"),
        districtcode: this.selecteddistrict,
        dif_year: this.selectedyear,
        department_id: this.selecteddept,
        freezeflag: 'F',
        createdby: this.username
      });

      if (this.selecteddept == 100 && this.selecteddistrict!=100)
      {
        this.ds.updateData('crud/updatedistrictfreezreq', this.freezunfreezform.value).subscribe(res => {
          this.data = res;
          if (this.data == "Data Not Found") {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
          else if (this.data) {
            Swal.fire({
              icon: "success",
              text: 'Data Updated Succesfully',
              timer: 3000
            });
          }
          else {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
        });
        this.freezunfreezform.reset();
      }
      else if (this.selecteddistrict == 100 && this.selecteddept != 100)
      {
        this.ds.updateData('crud/updatedeptfreezreq', this.freezunfreezform.value).subscribe(res => {
          this.data = res;
          if (this.data == "Data Not Found") {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
          else if (this.data) {
            Swal.fire({
              icon: "success",
              text: 'Data Updated Succesfully',
              timer: 3000
            });
          }
          else {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
        });
        this.freezunfreezform.reset();
      }
      else if (this.selecteddept == 100 && this.selecteddistrict == 100)
      {
        this.ds.updateData('crud/updateallfreezreq', this.freezunfreezform.value).subscribe(res => {
          this.data = res;
          if (this.data == "Data Not Found") {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
          else if (this.data) {
            Swal.fire({
              icon: "success",
              text: 'Data Updated Succesfully',
              timer: 3000
            });
          }
          else {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
        });
        this.freezunfreezform.reset();
      }
      else if (this.selecteddept != 100 && this.selecteddistrict != 100)
      {
        this.ds.updateData('crud/updatefreezreq', this.freezunfreezform.value).subscribe(res => {
          this.data = res;
          if (this.data == "Data Not Found") {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
          else if (this.data) {
            Swal.fire({
              icon: "success",
              text: 'Data Updated Succesfully',
              timer: 3000
            });
          }
          else {
            Swal.fire({
              icon: "error",
              text: 'Please Check.....',
              timer: 3000
            });
          }
        });
        this.freezunfreezform.reset();
      }     
    }
  }


}
