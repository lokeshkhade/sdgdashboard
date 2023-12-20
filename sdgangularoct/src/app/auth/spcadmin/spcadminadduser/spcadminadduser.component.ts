import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-spcadminadduser',
  templateUrl: './spcadminadduser.component.html',
  styleUrls: ['./spcadminadduser.component.scss']
})
export class SpcadminadduserComponent implements OnInit {

  public adduser: FormGroup; //add  FormGroup 
  public roles: any = [];

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.adduser = this.fb.group({ //definition to cons
      roleid: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      emailid: ['', Validators.required] ,
      mobilenumber: ['', Validators.required]

    });

  }

  ngOnInit(): void {
    this.getallindicators();
  }

  getallindicators() {
    this.ds.getData('common/getallroles').subscribe((res: any) => {
      this.roles = res;
    });
  }


  isValidInput(fieldName: any): boolean {
    return this.adduser.controls[fieldName].invalid &&
      (this.adduser.controls[fieldName].dirty || this.adduser.controls[fieldName].touched);
  }

}
