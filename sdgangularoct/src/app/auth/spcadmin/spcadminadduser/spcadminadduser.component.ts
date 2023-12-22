import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spcadminadduser',
  templateUrl: './spcadminadduser.component.html',
  styleUrls: ['./spcadminadduser.component.scss']
})
export class SpcadminadduserComponent implements OnInit {



  public manageuser: FormGroup; //add  FormGroup 
  public roles: any = [];
  public users: any = [];
  public data: any; public currentUser: any; user_id: any; public deptname: any;
  userdatabyid: any;

  displayedColumns: string[] = ['sn', 'firstname', 'lastname', 'username', 'email', 'mobilenumber', 'createddate', 'EditData', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  edituser_id: any;

  isAdd: boolean = true;
  isEditMode: boolean = false;

  isUpdate: boolean = true;

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService) {
    this.manageuser = this.fb.group({ //definition to cons
      roleid: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      mobilenumber: ['', [Validators.pattern("[6789][0-9]{9}"), Validators.required, Validators.maxLength(10)]]
    });

  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getdeptname(this.currentUser.departmentid);
    this.getallroles();
    this.getallactiveusers();
  }

  getdeptname(deptid: any) {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].description;
    });
  }

  getallroles() {
    this.ds.getData('common/getallroles').subscribe((res: any) => {
      this.roles = res;
    });
  }

  getallactiveusers() 
  {
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


  onSubmit() 
  {
    this.ds.postData('user/adduser', this.manageuser.value).subscribe(res => {
      this.data = res;
      if (this.data) {
        Swal.fire({
          icon: "success",
          text: 'Data Saved Succesfully',
          timer: 2000
        });
      }
    });
  }

  onEdit(id: any) {
    this.userdatabyid = this.users.find((f: any) => f.id === parseInt(id));
    this.isEditMode = true;
    this.isAdd = false;
    this.edituser_id = id;

    this.manageuser.patchValue
      ({
        roleid: this.userdatabyid.roleid,
        firstname: this.userdatabyid.firstname,
        lastname: this.userdatabyid.lastname,
        username: this.userdatabyid.username,
        email: this.userdatabyid.email,
        mobilenumber: this.userdatabyid.mobilenumber
      });
  }


  onClear() {
    this.isEditMode = false;
    this.isAdd = true;
    this.manageuser.reset();
  }

  onUpdate() 
  {
    this.ds.updateData('user/updateUserById/' + this.edituser_id, this.manageuser.value).subscribe(res => {
      this.data = res;
      if (this.data)
        alert('Data Updated Succesfully');
    });
    this.getallactiveusers();
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
