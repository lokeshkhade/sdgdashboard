import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-auditreport',
  templateUrl: './auditreport.component.html',
  styleUrls: ['./auditreport.component.scss']
})
export class AuditreportComponent implements OnInit {

  public auditreport: FormGroup; //add  FormGroup 
  public auditreports: any = [];

  displayedColumns: string[] = ['sn', 'username', 'role_name', 'department', 'activity', 'updated_at'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.auditreport = this.fb.group({ //definition to cons
      username: ['', Validators.required],
      role_name: ['', Validators.required],
      department: ['', Validators.required],
      activity: ['', Validators.required],
      updated_at: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getallauditreports();
  } 

  getallauditreports() {
    let index = 0;
    this.ds.getData('common/getallaudittrails').subscribe((res: any) => {
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
