import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.scss']
})
export class ManageuserComponent implements OnInit {

  public manageuser: FormGroup; //add  FormGroup 
  public roles: any = [];
  public users: any = [];  

  displayedColumns: string[] = ['sn', 'firstname', 'lastname', 'username', 'emailid', 'mobilenumber', 'createddate' , 'EditData', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.manageuser = this.fb.group({ //definition to cons
      roleid: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      emailid: ['', Validators.required],
      mobilenumber: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getallroles();
    this.getallactiveusers();
  }

  getallroles() {
    this.ds.getData('common/getallroles').subscribe((res: any) => {
      this.roles = res;
    });
  }

  getallactiveusers() {
    let index = 0;
    this.ds.getData('common/getallactiveusers').subscribe((res: any) => {
      this.users = res;
      this.users.forEach(e => {
        this.users[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  isValidInput(fieldName: any): boolean {
    return this.manageuser.controls[fieldName].invalid &&
      (this.manageuser.controls[fieldName].dirty || this.manageuser.controls[fieldName].touched);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  


}
