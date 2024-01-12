import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spcadminadduser',
  templateUrl: './spcadminadduser.component.html',
  styleUrls: ['./spcadminadduser.component.scss']
})
export class SpcadminadduserComponent implements OnInit {

  public manageuser: FormGroup; //add  FormGroup 
  public roles: any = []; public username: any = [];
  public users: any = []; public departments: any = []; 
  public districts: any = [];
  public data: any; public currentUser: any; user_id: any; public deptname: any;
  userdatabyid: any;

  displayedColumns: string[] = ['sn', 'firstname', 'lastname', 'username', 'email', 'mobilenumber', 'createddate', 'EditData', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  edituser_id: any;

  isAdd: boolean = true;
  isEditMode: boolean = false;

  isDepartment: boolean = false;
  isDistrict: boolean = false;

  isUpdate: boolean = true;

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService, private router: Router) {
    this.manageuser = this.fb.group({ //definition to cons
      roleid: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      districtcode:[0],
      departmentid:[0],
      mobilenumber: ['', [Validators.pattern("[6789][0-9]{9}"), Validators.required, Validators.maxLength(10)]]
    });

  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getallroles();
    this.getallactiveusers();
    this.getdepartment();
    this.getdistrict();
  }

  getallroles() {
    this.ds.getData('common/getallroles').subscribe((res: any) => {
      this.roles = res;
    });
  }

  getdepartment() {
    this.ds.getData('common/getalldepartment').subscribe((res: any) => {
      this.departments = res;
    });
  }

  getdistrict() {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.districts = res;
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
        else {
          Swal.fire({
            icon: "error",
            text: 'Error.....',
            timer: 2000
          });
        }
        this.onClear();
      });
  
  }

  onEdit(id: any) 
  {
    this.userdatabyid = this.users.find((f: any) => f.id === parseInt(id));
    this.isEditMode = true;
    this.isAdd = false;
    this.edituser_id = id;

    console.log(this.userdatabyid.roleid, this.userdatabyid.districtcode, this.userdatabyid.departmentid);

    if (this.userdatabyid.roleid == 2 || this.userdatabyid.roleid == 3 || this.userdatabyid.roleid == 1) {
      this.isDepartment = true;
      this.isDistrict = false;
    }
    else if (this.userdatabyid.roleid == 5 || this.userdatabyid.roleid == 4) {
      this.isDistrict = true;
      this.isDepartment = false;
    }
    else {
      this.isDepartment = false;
      this.isDistrict = false;
    }

    this.manageuser.patchValue
      ({
        roleid: this.userdatabyid.roleid,
        firstname: this.userdatabyid.firstname,
        lastname: this.userdatabyid.lastname,
        username: this.userdatabyid.username,
        email: this.userdatabyid.email,
        mobilenumber: this.userdatabyid.mobilenumber,
        districtcode: this.userdatabyid.districtcode,
        departmentid: this.userdatabyid.departmentid
      });
  }


  onClear() {
    this.isEditMode = false;
    this.isAdd = true;
    this.manageuser.reset();
    this.isDepartment = false;
    this.isDistrict = false;
  }

  onUpdate() 
  {
    this.ds.updateData('user/updateUserById/' + this.edituser_id, this.manageuser.value).subscribe(res => {
      this.data = res;
      if (this.data)
      {
        Swal.fire({
          icon: "success",
          text: 'Data Updated Successfully',
          timer: 2000
        });
        this.getallactiveusers();
      }
    });   
    this.onClear();
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

  reset() {
    window.location.reload();
  }

  onRoleChangeEvent(event: any)
  {
    if (event.value == 2 || event.value == 3)
    {
      this.isDepartment = true;
      this.isDistrict = false;
    }
    else if (event.value == 5 || event.value == 4) 
    {
      this.isDistrict = true;
      this.isDepartment = false;
    }
    else
    {
      this.isDepartment = false;
      this.isDistrict = false;
    }
  }


  onUserNameChangeEvent(event: any) 
  {
    this.ds.paramFunction('common/getusername', event.target.value).subscribe((res: any) => {
      this.username = res;
      if (res.length > 0)
      {
        Swal.fire({
          icon: "info",
          text: 'Username already exists please choose another username',
          timer: 2000
        });
        this.onClear();
      }
    });
  }

  slideChange(id: any) 
  {
    this.ds.updateData('user/updateuserflag/' + id, this.manageuser.value).subscribe(res => {
      this.data = res;
      if (this.data) {
        Swal.fire({
          icon: "success",
          text: 'User is Disable now',
          timer: 2000
        });
        this.getallactiveusers();
      }
      else {
        Swal.fire({
          icon: "error",
          text: 'Error, Please check....',
          timer: 2000
        });
      }
    });

  }

}
