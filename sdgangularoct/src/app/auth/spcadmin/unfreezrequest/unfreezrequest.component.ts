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
  selector: 'app-unfreezrequest',
  templateUrl: './unfreezrequest.component.html',
  styleUrls: ['./unfreezrequest.component.scss']
})
export class UnfreezrequestComponent implements OnInit {

  public freezunfreezform: FormGroup; //add  FormGroup 
  public departments: any = [];
  public years: any = [];
  public requestdeptdata: any = []; public requestalldata: any = [];
  public selectedyear: any; public data:any =[];
  public selecteddept: any; public freezefrom: any; public freezeto: any; 
  public today = new Date(); public currentUser: any; public username: any;

  public reqdistrict_code: any; public reqdepartment_id: any; public reqdif_year: any; public reqfreezflag: any;

  displayedColumns: string[] = ['sn', 'deptname', 'districtname', 'entrytodate', 'entryfromdate', 'status', 'ApproveRequest'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private ds: DataService, private dp: DatePipe, private authService: AuthService) {
    this.freezunfreezform = this.fb.group({ //definition to cons
      department_id: ['', Validators.required],
      districtcode: ['', Validators.required],
      dif_year: ['', Validators.required],
      freezefrom: ['', Validators.required],
      freezeto: ['', Validators.required],
      createdby:[''],
      freezeflag:['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.username = user.username;
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
        text: 'Please select a year',
        timer: 3000
      });
    }

    if (this.selecteddept == "") {
      Swal.fire({
        icon: "error",
        text: 'Please select a department',
        timer: 3000
      });
    }

    if (this.selecteddept == 100)
    {
      let index = 0;
      this.ds.paramFunction('common/getallunfreezrequest', this.selectedyear).subscribe((res: any) => {
        this.requestalldata = res;
        if (this.requestalldata.message=="Data Not Found")
        {
          Swal.fire({
            icon: "error",
            text: 'Data is not available for this year',
            timer: 3000
          });
          this.freezunfreezform.reset();   
        }
        else
        {
          this.requestalldata.forEach(e => {
            this.requestalldata[index].sn = index + 1;
            index++;
          });
          this.dataSource = new MatTableDataSource(this.requestalldata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        
        
      });      
    }

    if (this.selecteddept != 100) 
    {
      let index = 0;
      this.ds.param2Function('common/getdeptunfreezrequest', this.selecteddept, this.selectedyear).subscribe((res: any) => {
        this.requestdeptdata = res;
        if (this.requestdeptdata.message == "Data Not Found") 
        {
          Swal.fire({
            icon: "error",
            text: 'Data is not available for this year',
            timer: 3000
          });
          this.freezunfreezform.reset();
        }
        else 
        {
          this.requestdeptdata.forEach(e => {
            this.requestdeptdata[index].sn = index + 1;
            index++;
          });
          this.dataSource = new MatTableDataSource(this.requestdeptdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
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

    this.reqdistrict_code = district_code;
    this.reqdepartment_id = department_id;
    this.reqdif_year = dif_year;
    this.reqfreezflag = freezflag;
   
  }

  
  FinalApprove()
  {
    this.freezefrom == "" ;
    this.freezeto == "";
    
    this.freezefrom = this.dp.transform(this.freezunfreezform.get("freezefrom")?.value, "yyyy-MM-dd");
    this.freezeto = this.dp.transform(this.freezunfreezform.get("freezeto")?.value, "yyyy-MM-dd");

    if (this.freezefrom == null || this.freezeto == null || this.freezefrom == "" || this.freezeto == "")
    {
      Swal.fire({
        icon: "error",
        text: 'Please Select Both Freezfrom and Freezto Date',
        timer: 3000
      });
    }
    else
    {
      this.freezunfreezform.patchValue({
        freezefrom: this.dp.transform(this.freezunfreezform.get("freezefrom")?.value, "yyyy-MM-dd"),
        freezeto: this.dp.transform(this.freezunfreezform.get("freezeto")?.value, "yyyy-MM-dd"),
        districtcode: this.reqdistrict_code,
        dif_year:this.selectedyear,
        department_id: this.reqdepartment_id,
        freezeflag:'F',
        createdby: this.username
        });

      this.ds.updateData('crud/updatefreezreq', this.freezunfreezform.value).subscribe(res => 
      {
        this.data = res;
        if (this.data == "Data Not Found") 
        {
          Swal.fire({
            icon: "error",
            text: 'Please Check.....',
            timer: 3000
          });
        }
        else if (this.data)
        {          
          Swal.fire({
            icon: "success",
            text: 'Data Updated Succesfully',
            timer: 3000
          });
        }
        else 
        {
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
