import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';
import { Router, RouterEvent } from '@angular/router';

import { DataService } from '../services/data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public errorText: string = "";
  public showCaptchaError: boolean = false;
  public showInvalid: boolean = false;

  @ViewChild('close') closeModal: ElementRef | undefined;
  @ViewChild('dataContainer', { static: false }) dataContainer: ElementRef | undefined;

  public svg: any = [];
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private ds: DataService,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
      captchaText: [''],
      otp: [''],

    });
  }

  ngOnInit(): void {
    this.svgcaptcha();
  }

  svgcaptcha() {
    this.http.get(environment.rootUrl + 'captcha').subscribe(res => {
      this.svg = res;
      this.dataContainer.nativeElement.innerHTML = this.svg.data;
      this.loginForm.patchValue({ captchaText: this.svg.text })
    },
      error => {
        this.errorText = 'Something bad happened; please try again later.';
      });
  }

  refresh()
  {
    window.location.reload();
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }


  login() {
    if (this.loginForm.valid && this.loginForm.get('captcha').value === this.loginForm.get('captchaText').value) 
    {
      this.authService.login(this.loginForm.value).subscribe(res => 
      {
        if (res['success'] == 1) 
        {
          console.log(res,"heloo");
          // if (res['status'] == 0) {
          //   this.router.navigate(['profile']);
          // }
          // else if (res['status'] == 1) {
            switch (res['role']) {
              case 1:
              {
                  this.router.navigate(['/spcadmin/dashboard']);
                  break;
              }
              case 2: 
              {
                  this.router.navigate(['/department/deptlanding']);
                break;
              }
              case 3:
              {
                  this.router.navigate(['/department/deptlanding']);
                break;
              }  
              case 4:
              {
                  this.router.navigate(['/district/districtdashboard']);
                  break;
              }             
              default:
              {
                  Swal.fire({
                    icon: 'error',
                    text: 'Please Check Login Details',
                    timer: 5000
                  });
                  break;
                }
              }
        }          
        else 
        {
            Swal.fire({
              icon: 'error',
              text: 'Please check login Details',
              timer: 5000
            });
        }
      });
    }
    else {
      this.showCaptchaError = true;
      setTimeout(() => {
        this.showCaptchaError = false;
      }, 3000);
    }
  }



}
