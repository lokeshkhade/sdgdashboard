import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-districtuploadtemplate',
  templateUrl: './districtuploadtemplate.component.html',
  styleUrls: ['./districtuploadtemplate.component.scss']
})

export class DistrictuploadtemplateComponent implements OnInit 
{
  public districttemplateupload: FormGroup; //add  FormGroup 
  public deptname: any; public districtname: any; public currentUser: any;
  public user_id: any;
  public notifications: any = [];
  public selectedyear: any;

  public file: any = File;
  public filename: any;

  rootUrl = environment.rootUrl;

  ///////////////////////////

  constructor(private fb: FormBuilder, private ds: DataService, private authService: AuthService, private http: HttpClient,) 
  {
    this.districttemplateupload = this.fb.group({ //definition to cons
            filepath:[]
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
  } get f() {
    return this.districttemplateupload.controls;
  }  

  onFileChange(event: any) 
  {
    if (event.target.files.length > 0) 
    {
      this.file = <File>event.target.files[0];
      if ((this.file.type == 'text/csv' || this.file.type == 'text/xlsx' || this.file.type == 'text/xls')) 
      {      
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);        
        this.districttemplateupload.patchValue
          ({
            filepath: 0,
          });
      }
      else
      {
        Swal.fire('Only CSV/XLSX/XLS file are accepted');
        event.target.value = null;
      }    
    }
  }


  


  save()
  {
    const folder_location = './upload/' + this.currentUser.departmentid + '/';
    const formData = new FormData();
    formData.append('files', this.file, this.file.name);

    formData.append('folder_name', folder_location);

    console.log("hi",formData);

    this.http.post(environment.rootUrl + 'upload', formData).subscribe((res: any) => {
      this.filename = res;
      console.log(this.filename);
    });  

  }


}
