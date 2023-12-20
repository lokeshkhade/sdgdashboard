import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generatereport',
  templateUrl: './generatereport.component.html',
  styleUrls: ['./generatereport.component.scss']
})
export class GeneratereportComponent implements OnInit {

  public sifdifreport: FormGroup; //add  FormGroup 
  public roles: any = [];  public years: any = [];
  public sifyear: any = []; public sifindicator: any = [];
  public sifdata: any = []; public difdatabalod: any = []; public difdatabalodabazar: any = [];
  public difdata: any = [];

  public district: any = []; public difindicator: any = [];

  public selectedyear: any;
  public showdif = false;
  public showsif = false;
  

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.sifdifreport = this.fb.group({ //definition to cons
      valueyear: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getallyears();   
    this.selectedyear="";
  }


  getallyears() {
    this.ds.getData('common/getallyears').subscribe((res: any) => {
      this.years = res;
    });
  } 

  reset() {
    window.location.reload();
  } 

  sifreport()
  {
    if (this.selectedyear == "") {
      Swal.fire({
        icon: "error",
        text: 'Please Select Year',
        timer: 2000
      });
    }
    else {
        this.showdif=false;
        this.showsif = true;
      this.getsifdata(this.selectedyear);
    }
  }

  difreport()
  {
    this.showdif = true;
    this.showsif = false;
    this.getdifdata(this.selectedyear);
  }


  isValidInput(fieldName: any): boolean {
    return this.sifdifreport.controls[fieldName].invalid &&
      (this.sifdifreport.controls[fieldName].dirty || this.sifdifreport.controls[fieldName].touched);
  }


  onYearSelected(event: any) {
    this.selectedyear = event.value;
  }


  getsifdata(year:any) {

    this.sifdata = "";

    this.ds.paramFunction('sif/getsifreport', year).subscribe((res: any) => {
      this.sifdata = res;
      // if (this.sifdata == "") {
      //   Swal.fire({
      //     icon: "error",
      //     text: 'Data is not available for Year',
      //     timer: 2000
      //   });
      // }
    });    

    
  }


  getdifdata(year: any) {

    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.district = res;
    });

    this.ds.getData('common/getalldifindicators').subscribe((res: any) => {
      this.difindicator = res;
    });    

    this.difdatabalod = "";

    this.ds.paramFunction('data/getdifreportbalod', year).subscribe((res: any) => {
      this.difdatabalod = res;
      // if (this.sifdata == "") {
      //   Swal.fire({
      //     icon: "error",
      //     text: 'Data is not available for Year',
      //     timer: 2000
      //   });
      // }
    });

    this.ds.paramFunction('data/getdifreportbaldabazar', year).subscribe((res: any) => {
      this.difdatabalodabazar = res;
      // if (this.sifdata == "") {
      //   Swal.fire({
      //     icon: "error",
      //     text: 'Data is not available for Year',
      //     timer: 2000
      //   });
      // }
    });

    this.ds.paramFunction('data/getdifreport', year).subscribe((res: any) => {
      this.difdata = res;
      // if (this.sifdata == "") {
      //   Swal.fire({
      //     icon: "error",
      //     text: 'Data is not available for Year',
      //     timer: 2000
      //   });
      // }
    });


  }



 
}
