import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cggpm',
  templateUrl: './cggpm.component.html',
  styleUrls: ['./cggpm.component.scss']
})
export class CggpmComponent implements OnInit {

  public cgsvggpm: FormGroup; //add  FormGroup 
  public compositescore: any = [];

  public DT01: any;
  public DT01T: any;

  public DT02: any;
  public DT02T: any;

  public DT03: any;
  public DT03T: any;

  public DT04: any;
  public DT04T: any;

  public DT05: any;
  public DT05T: any;

  public DT06: any;
  public DT06T: any;

  public DT07: any;
  public DT07T: any;

  public DT08: any;
  public DT08T: any;

  public DT09: any;
  public DT09T: any;

  public DT10: any;
  public DT10T: any;

  public DT11: any;
  public DT11T: any;

  public DT12: any;
  public DT12T: any;

  public DT13: any;
  public DT13T: any;

  public DT14: any;
  public DT14T: any;

  public DT15: any;
  public DT15T: any;

  public DT16: any;
  public DT16T: any;

  public DT17: any;
  public DT17T: any;

  public DT18: any;
  public DT18T: any;

  public DT19: any;
  public DT19T: any;

  public DT20: any;
  public DT20T: any;

  public DT21: any;
  public DT21T: any;

  public DT22: any;
  public DT22T: any;

  public DT23: any;
  public DT23T: any;

  public DT24: any;
  public DT24T: any;

  public DT25: any;
  public DT25T: any;

  public DT26: any;
  public DT26T: any;

  public DT27: any;
  public DT27T: any;

  public DT28: any;
  public DT28T: any;

  public DT29: any;
  public DT29T: any;

  public cgyear: any;
  public cgyear1: any;

  constructor(private fb: FormBuilder, private ds: DataService) {

    this.cgsvggpm = this.fb.group({ //definition to cons            
    });

  }

  ngOnInit(): void {
    this.cgyear = this.ds.currentyear.value;
    this.getcgcompositecoreyearwise(this.cgyear);
    this.ds.cgelectedYear$.subscribe((data: any) => {
      this.cgyear = data
      this.getcgcompositecoreyearwise(this.cgyear)
    });

    this.DT28 = '#8b0864';
    this.DT29 = '#8b0864';
  }

  getcgcompositecoreyearwise(cgyear1: any) {
    this.ds.paramFunction('data/getcompositescoreyearwise', cgyear1).subscribe((res: any) => {
      this.compositescore = res;
      for (var index in res) {
        if (res[index].district_code == "DT01") {
          if (res[index].compositescore <= 49) {
            this.DT01 = '#dd1e47';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT01 = '#ffc40c';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT01 = '#00a084';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT01 = '#00aeef';
            this.DT01T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT02") {
          if (res[index].compositescore <= 49) {
            this.DT02 = '#dd1e47';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT02 = '#ffc40c';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT02 = '#00a084';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT02 = '#00aeef';
            this.DT02T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT03") {
          if (res[index].compositescore <= 49) {
            this.DT03 = '#dd1e47';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT03 = '#ffc40c';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT03 = '#00a084';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT03 = '#00aeef';
            this.DT03T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT04") {
          if (res[index].compositescore <= 49) {
            this.DT04 = '#dd1e47';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT04 = '#ffc40c';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT04 = '#00a084';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT04 = '#00aeef';
            this.DT04T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT05") {
          if (res[index].compositescore <= 49) {
            this.DT05 = '#dd1e47';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT05 = '#ffc40c';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT05 = '#00a084';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT05 = '#00aeef';
            this.DT05T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT06") {
          if (res[index].compositescore <= 49) {
            this.DT06 = '#dd1e47';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT06 = '#ffc40c';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT06 = '#00a084';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT06 = '#00aeef';
            this.DT06T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT07") {
          if (res[index].compositescore <= 49) {
            this.DT07 = '#dd1e47';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT07 = '#ffc40c';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT07 = '#00a084';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT07 = '#00aeef';
            this.DT07T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT08") {
          if (res[index].compositescore <= 49) {
            this.DT08 = '#dd1e47';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT08 = '#ffc40c';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT08 = '#00a084';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT08 = '#00aeef';
            this.DT08T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT09") {
          if (res[index].compositescore <= 49) {
            this.DT09 = '#dd1e47';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT09 = '#ffc40c';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT09 = '#00a084';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT09 = '#00aeef';
            this.DT09T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT10") {
          if (res[index].compositescore <= 49) {
            this.DT10 = '#dd1e47';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT10 = '#ffc40c';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT10 = '#00a084';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT10 = '#00aeef';
            this.DT10T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT11") {
          if (res[index].compositescore <= 49) {
            this.DT11 = '#dd1e47';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT11 = '#ffc40c';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT11 = '#00a084';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT11 = '#00aeef';
            this.DT11T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT12") {
          if (res[index].compositescore <= 49) {
            this.DT12 = '#dd1e47';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT12 = '#ffc40c';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT12 = '#00a084';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT12 = '#00aeef';
            this.DT12T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT13") {
          if (res[index].compositescore <= 49) {
            this.DT13 = '#dd1e47';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT13 = '#ffc40c';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT13 = '#00a084';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT13 = '#00aeef';
            this.DT13T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT14") {
          if (res[index].compositescore <= 49) {
            this.DT14 = '#dd1e47';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT14 = '#ffc40c';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT14 = '#00a084';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT14 = '#00aeef';
            this.DT14T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT15") {
          if (res[index].compositescore <= 49) {
            this.DT15 = '#dd1e47';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT15 = '#ffc40c';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT15 = '#00a084';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT15 = '#00aeef';
            this.DT15T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT16") {
          if (res[index].compositescore <= 49) {
            this.DT16 = '#dd1e47';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT16 = '#ffc40c';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT16 = '#00a084';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT16 = '#00aeef';
            this.DT16T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT17") {
          if (res[index].compositescore <= 49) {
            this.DT17 = '#dd1e47';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT17 = '#ffc40c';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT17 = '#00a084';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT17 = '#00aeef';
            this.DT17T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT18") {
          if (res[index].compositescore <= 49) {
            this.DT18 = '#dd1e47';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT18 = '#ffc40c';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT18 = '#00a084';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT18 = '#00aeef';
            this.DT18T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT19") {
          if (res[index].compositescore <= 49) {
            this.DT19 = '#dd1e47';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT19 = '#ffc40c';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT19 = '#00a084';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT19 = '#00aeef';
            this.DT19T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT20") {
          if (res[index].compositescore <= 49) {
            this.DT20 = '#dd1e47';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT20 = '#ffc40c';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT20 = '#00a084';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT20 = '#00aeef';
            this.DT20T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT21") {
          if (res[index].compositescore <= 49) {
            this.DT21 = '#dd1e47';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT21 = '#ffc40c';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT21 = '#00a084';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT21 = '#00aeef';
            this.DT21T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT22") {
          if (res[index].compositescore <= 49) {
            this.DT22 = '#dd1e47';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT22 = '#ffc40c';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT22 = '#00a084';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT22 = '#00aeef';
            this.DT22T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT23") {
          if (res[index].compositescore <= 49) {
            this.DT23 = '#dd1e47';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT23 = '#ffc40c';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT23 = '#00a084';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT23 = '#00aeef';
            this.DT23T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT24") {
          if (res[index].compositescore <= 49) {
            this.DT24 = '#dd1e47';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT24 = '#ffc40c';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT24 = '#00a084';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT24 = '#00aeef';
            this.DT24T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT25") {
          if (res[index].compositescore <= 49) {
            this.DT25 = '#dd1e47';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT25 = '#ffc40c';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT25 = '#00a084';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT25 = '#00aeef';
            this.DT25T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT26") {
          if (res[index].compositescore <= 49) {
            this.DT26 = '#dd1e47';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT26 = '#ffc40c';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT26 = '#00a084';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT26 = '#00aeef';
            this.DT26T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

        if (res[index].district_code == "DT27") {
          if (res[index].compositescore <= 49) {
            this.DT27 = '#dd1e47';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 50 && res[index].compositescore <= 64) {
            this.DT27 = '#ffc40c';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 65 && res[index].compositescore <= 99) {
            this.DT27 = '#00a084';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
          else if (res[index].compositescore >= 100) {
            this.DT27 = '#00aeef';
            this.DT27T = res[index].district_name + " with District Score :" + res[index].compositescore;
          }
        }

      }//for
    });//
  }//function-end
}
