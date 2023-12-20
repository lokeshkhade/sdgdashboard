import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-freezdata',
  templateUrl: './freezdata.component.html',
  styleUrls: ['./freezdata.component.scss']
})
export class FreezdataComponent implements OnInit {

  public freezunfreezform: FormGroup; //add  FormGroup 
  public departments: any = [];
  public districts: any = [];
  public years: any = [];

  public today = new Date();

  constructor(private fb: FormBuilder, private ds: DataService, private datePipe: DatePipe) {
    this.freezunfreezform = this.fb.group({ //definition to cons
      dept_id: ['', Validators.required],
      district_code: ['', Validators.required],
      valueyear: ['', Validators.required],
      freezefrom: ['', Validators.required],
      freezeto: ['', Validators.required]
     
    });

  }

  ngOnInit(): void {
    this.getalldepartments();
    this.getalldistrict();
    this.getallyears();
  }

  getalldistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.districts = res;
    });
  }

  getalldepartments() {
    this.ds.getData('common/getalldepartment').subscribe((res: any) => {
      this.departments = res;
    });
  }

  getallyears() {
    this.ds.getData('common/getallyears').subscribe((res: any) => {
      this.years = res;
    });
  }

  


  isValidInput(fieldName: any): boolean {
    return this.freezunfreezform.controls[fieldName].invalid &&
      (this.freezunfreezform.controls[fieldName].dirty || this.freezunfreezform.controls[fieldName].touched);
  }


  

  reset() {
    window.location.reload();
  }


}
