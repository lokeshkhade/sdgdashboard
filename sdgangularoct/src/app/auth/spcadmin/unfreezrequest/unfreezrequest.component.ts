import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unfreezrequest',
  templateUrl: './unfreezrequest.component.html',
  styleUrls: ['./unfreezrequest.component.scss']
})
export class UnfreezrequestComponent implements OnInit {

  public freezunfreezform: FormGroup; //add  FormGroup 
  public departments: any = [];
  public years: any = [];
  public requestdeptdata: any = []; public requestalldata: any = [];
  public selectedyear : any;
  public selecteddept: any;
  public today = new Date();

  displayedColumns: string[] = ['sn', 'deptname', 'districtname', 'entrytodate', 'entryfromdate', 'status', 'ApproveRequest'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    this.getallyears();
    this.selectedyear = "";
    this.selecteddept = "";
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

  onYearSelected(event: any) {
    this.selectedyear = event.value;
  }

  onDepartmentSelected(event: any) {
    this.selecteddept = event.value;
  }


  getrequestdata() 
  {
    if (this.selectedyear == "")
    {
      Swal.fire({
        icon: "error",
        text: 'Please Select Year',
        timer: 2000
      });
    }

    if (this.selecteddept == "") {
      Swal.fire({
        icon: "error",
        text: 'Please Select Department',
        timer: 2000
      });
    }

    if (this.selecteddept == 100)
    {
      let index = 0;
      this.ds.paramFunction('common/getallunfreezrequest', this.selectedyear).subscribe((res: any) => {
        this.requestalldata = res;
        this.requestalldata.forEach(e => {
          this.requestalldata[index].sn = index + 1;
          index++;
        });
        this.dataSource = new MatTableDataSource(this.requestalldata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });      
    }

    if (this.selecteddept != 100) 
    {
      let index = 0;
      this.ds.param2Function('common/getdeptunfreezrequest', this.selecteddept, this.selectedyear).subscribe((res: any) => {
        this.requestdeptdata = res;
        this.requestdeptdata.forEach(e => {
          this.requestdeptdata[index].sn = index + 1;
          index++;
        });
        this.dataSource = new MatTableDataSource(this.requestdeptdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });     
    }  
   
  }


  isValidInput(fieldName: any): boolean {
    return this.freezunfreezform.controls[fieldName].invalid &&
      (this.freezunfreezform.controls[fieldName].dirty || this.freezunfreezform.controls[fieldName].touched);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reset() {
    window.location.reload();
  }

  Approve(district_code: any, department_id: any, dif_year: any, freezflag: any) {

    console.log(district_code, department_id, dif_year, freezflag)
   
  }

  slideChange(district_code: any, department_id: any, dif_year: any, freezflag: any, checked) {

    console.log(district_code, department_id, dif_year, freezflag)

  }

}
