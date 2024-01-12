import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
// import * as bcrypt from 'bcryptjs';
// const salt = bcrypt.genSaltSync(10);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public changePassworform: FormGroup;
  public currentUser: any;
  public result: any; public userrole: any; public username: any;
  public saltdata: any; public currentpass: any; public newpass: any;
  public repass: any;
  constructor(private authService: AuthService, private fb: FormBuilder, private ds: DataService ){ }

  ngOnInit(): void 
  {
    this.currentUser = this.authService.currentUser;
    let user = this.authService.currentUser;
    let username = this.currentUser.username;

    if (this.currentUser.role == 1) {
      this.userrole = "Administrator";
    }
    if (this.currentUser.role == 2) {
      this.userrole = "HOD Admin";
    }
    if (this.currentUser.role == 3) {
      this.userrole = "";
    }
    if (this.currentUser.role == 4) {
      this.userrole = "Data Entry Operator";
    }
    if (this.currentUser.role == 5) {
      this.userrole = "";
    }
    if (this.currentUser.role == 6) {
      this.userrole = "Department Login";
    }
   
    this.changePassworform = this.fb.group
      ({
        id: [this.currentUser.id],
        username: [this.currentUser.username],
        role: [this.currentUser.role],
        current_password: ['', Validators.required],
        new_password: ['', Validators.required],
        re_password: ['', Validators.required]
      },
        {
          validator: this.confirmedValidator('new_password', 're_password')
        });

    this.getSaltData(this.currentUser.username, this.currentUser.id);
  }

  ///////////////////////////////////////////////////////////////////////

  getSaltData(username: any,id:any) 
  {
    this.ds.param2Function('login/validdata', username,id).subscribe((res: any) => {
      this.saltdata = res.data[0];      
      // if (this.saltdata == "" || this.saltdata == undefined ) 
      // {
        
      // }
    });
  }

  ///////////////////////////////////////////////////////////////////

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }

  /////////////////////////////////////////////////////////////

  isValidInput(fieldName: any): boolean {
    return this.changePassworform.controls[fieldName].invalid &&
      (this.changePassworform.controls[fieldName].dirty || this.changePassworform.controls[fieldName].touched);
  }

  //////////////////////////////////////////////////

  onCurrentPassChangeEvent(event: any) 
  {
    var str = event.target.value.concat('SDG%&456'.toString());
    this.currentpass = CryptoJS.SHA512(str);
    this.changePassworform.patchValue
      ({
        current_password: this.currentpass.toString()
      });
    this.changePassworform.value.current_password = this.currentpass;
  }

  ////////////////////////////////////////////////////////

  onNewPassChangeEvent(event: any) 
  {
    this.newpass = event.target.value;
    var str = this.newpass.concat('SDG%&456'.toString());
    this.newpass = CryptoJS.SHA512(str);
    this.changePassworform.patchValue
      ({
        new_password: this.newpass.toString()
      });

  }

  ///////////////////////////////////////////////////////

  onRePassChangeEvent(event: any) 
  {
    this.repass = event.target.value;
    var str = this.repass.concat('SDG%&456'.toString());
    this.repass = CryptoJS.SHA512(str);
    this.changePassworform.patchValue
      ({
        re_password: this.repass.toString()
      });
  }

  ////////////////////////////////////////////////////////////////

  change() {
    if (this.changePassworform.valid) 
    {
      this.ds.updateData('login/changePassword', this.changePassworform.value).subscribe((res: any) => 
      {
        this.result = res;
        if (this.result.success) 
        {
          Swal.fire('Password Changed Successfully');
          this.authService.logout();
        }
        else {
          Swal.fire(this.result.message);
        }
      },
        (error: any) => {
          Swal.fire('Some error occured.');
        });
    }
    else {
      Swal.fire('Please Enter Correct Details....');
    }
  }

   //////////////////////////////////////////////////////
}
