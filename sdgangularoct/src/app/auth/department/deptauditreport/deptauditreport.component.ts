import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-deptauditreport',
  templateUrl: './deptauditreport.component.html',
  styleUrls: ['./deptauditreport.component.scss']
})
export class DeptauditreportComponent implements OnInit {

  public auditreport: FormGroup; //add  FormGroup 
  public auditreports: any = [];
  public currentUser: any; public user_id: any; public deptname : any;
  public deptdesc:any;
  displayedColumns: string[] = ['sn', 'username', 'role_name', 'department', 'activity', 'updated_at'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService) {
    this.auditreport = this.fb.group({ //definition to cons
      username: ['', Validators.required],
      role_name: ['', Validators.required],
      department: ['', Validators.required],
      activity: ['', Validators.required],
      updated_at: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.getdeptname(this.currentUser.departmentid);
   
  }

  getdeptname(deptid: any) {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].department_name;
      this.deptdesc = res[0].description;
      this.getallauditreports(this.deptname);
    });
  }

  getallauditreports(dept:any) {
    let index = 0;
    this.ds.paramFunction('common/getdeptaudittrails', dept).subscribe((res: any) => {
      this.auditreports = res;
      this.auditreports.forEach(e => {
        this.auditreports[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.auditreports);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  isValidInput(fieldName: any): boolean {
    return this.auditreport.controls[fieldName].invalid &&
      (this.auditreport.controls[fieldName].dirty || this.auditreport.controls[fieldName].touched);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
