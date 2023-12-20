import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-districttemplate',
  templateUrl: './districttemplate.component.html',
  styleUrls: ['./districttemplate.component.scss']
})
export class DistricttemplateComponent implements OnInit {

  public districttemplate: FormGroup; //add  FormGroup 
  public deptname: any; public districtname: any; public currentUser: any;
  public user_id: any;
  public notifications: any = [];
  public selectedyear: any;

  ///////////////////////////

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService) {
    this.districttemplate = this.fb.group({ //definition to cons
     
    });
  }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    this.user_id = user.userid;
    this.getdistrictname(this.currentUser.districtcode);
    this.getdeptname(this.currentUser.departmentid);
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


 



}
