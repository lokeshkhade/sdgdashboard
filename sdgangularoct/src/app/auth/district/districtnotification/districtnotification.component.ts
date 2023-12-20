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
  selector: 'app-districtnotification',
  templateUrl: './districtnotification.component.html',
  styleUrls: ['./districtnotification.component.scss']
})
export class DistrictnotificationComponent implements OnInit {

  public districtnotifications: FormGroup; //add  FormGroup 
  public deptname: any; public districtname: any; public currentUser: any;
  public user_id: any;
  public notifications: any = [];
  public selectedyear: any;

  displayedColumns: string[] = ['sn', 'notificationmsg', 'notificationdate', 'status'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ///////////////////////////

  constructor(private fb: FormBuilder, private ds: DataService,  private authService: AuthService) {
    this.districtnotifications = this.fb.group({ //definition to cons
      valueyear: [2015, Validators.required]
    });
  }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getdistrictname(this.currentUser.districtcode);
    this.getdeptname(this.currentUser.departmentid);
    this.getallnotifications(this.currentUser.departmentid, this.currentUser.districtcode);

  }

  getdistrictname(districtid: any) {
    this.ds.paramFunction('common/getdistirctname', districtid).subscribe((res: any) => {
      this.districtname = res[0].district_name;
    });
  }

  getdeptname(deptid: any) {
    this.ds.paramFunction('common/getdeptnamebyid', deptid).subscribe((res: any) => {
      this.deptname = res[0].department_name;
    });
  }



  getallnotifications(deptid:any,distid:any) 
  {
    let index = 0;
    this.ds.param2Function('common/getnotificationsbydistrict',deptid,distid).subscribe((res: any) => {
      this.notifications = res;
      this.notifications.forEach(e => {
        this.notifications[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.notifications);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  isValidInput(fieldName: any): boolean {
    return this.districtnotifications.controls[fieldName].invalid &&
      (this.districtnotifications.controls[fieldName].dirty || this.districtnotifications.controls[fieldName].touched);
  }


  reset() {
    window.location.reload();
  }



}
