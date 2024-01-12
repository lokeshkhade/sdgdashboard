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
  selector: 'app-populatedata',
  templateUrl: './populatedata.component.html',
  styleUrls: ['./populatedata.component.scss']
})
export class PopulatedataComponent implements OnInit {


  public populatedataform: FormGroup; //add  FormGroup 
  public years: any = []; public selectedyear: any; public populatedata: any = [];
  public indicators: any = [];
  public districts: any = []; public selecteddistrict : any ;

  public idicatorsign: any = []; public targetvalue: any = []; public maxindicatorvalue: any = [];
  public minindicatorvalue: any = []; public indicatordata: any = []; public normalizedscore: any = [];
  data: Object;

  constructor(private fb: FormBuilder, private ds: DataService) 
  {
    this.populatedataform = this.fb.group({ //definition to cons
      valueyear: ['', Validators.required],
      districtcode: ['', Validators.required]
    });
  }

  ngOnInit(): void 
  {
    this.getallyears();
    this.getalldistrict();
    this.selectedyear = ""; 
    this.selecteddistrict = "";
  }

  getallyears() {
    this.ds.getData('common/getallyears').subscribe((res: any) => {
      this.years = res;
    });
  }

  getalldistrict() 
  {
    this.ds.getData('common/getdistrict').subscribe((res: any) => {
      this.districts = res;
    });
  }

  reset() {
    window.location.reload();
  }

  onDistrictSelected(event: any) 
  {
    this.selecteddistrict = event.value;
  }
 
  isValidInput(fieldName: any): boolean 
  {
    return this.populatedataform.controls[fieldName].invalid &&
      (this.populatedataform.controls[fieldName].dirty || this.populatedataform.controls[fieldName].touched);
  }

  onYearSelected(event: any) 
  {
    this.selectedyear = event.value;
  }


  showdatapoints()
  {
    this.populatedata = [];
    this.ds.getData('common/getalldifindicators').subscribe((res: any) => {
      this.indicators = res;
    });

    this.ds.param2Function('populate/getpopulatedata', this.selectedyear,this.selecteddistrict).subscribe((res: any) => {
      this.populatedata = res;
    });   
   
  }

  populate()
  {    
    if (this.selectedyear == "")
    {
      Swal.fire({
        icon: "info",
        text: 'Please select year....',
        timer: 2000
      });
    }
    else if (this.selecteddistrict == "") {
      Swal.fire({
        icon: "info",
        text: 'Please select district....',
        timer: 2000
      });
    }
    else
    {
      this.ds.paramFunction('populate/getindicatoredata', this.selectedyear).subscribe((res: any) => {
        this.indicatordata = res;

        for (var index in this.indicatordata) {
          if (this.indicatordata[index].kpi_negation == 1) {
            let negativenormalize_value = ((this.indicatordata[index].indicators_value - this.indicatordata[index].kpi_target2030) / (this.indicatordata[index].dif_maxvalue - this.indicatordata[index].kpi_target2030));
            negativenormalize_value = ((1 - (isNaN(negativenormalize_value) ? 1 : negativenormalize_value)) * 100);
            if (this.indicatordata[index].dif_maxvalue <= this.indicatordata[index].kpi_target2030) {
              negativenormalize_value = 100.0;
            }
            else {
              if (negativenormalize_value < 0.0) {
                negativenormalize_value = 0.0;
              }
              else {
                negativenormalize_value = negativenormalize_value > 100 ? 100 : negativenormalize_value;
              }
            }

            // -----------------STATE AVERAGE CALCULATION (NEGATIVE)------------------------------ //

            let statenegativenormalize_value = ((this.indicatordata[index].cg_value - this.indicatordata[index].kpi_target2030) / (this.indicatordata[index].dif_maxvalue - this.indicatordata[index].kpi_target2030));
            statenegativenormalize_value = ((1 - (isNaN(statenegativenormalize_value) ? 1 : statenegativenormalize_value)) * 100);
            if (this.indicatordata[index].dif_maxvalue <= this.indicatordata[index].kpi_target2030) {
              statenegativenormalize_value = 100.0;
            }
            else {
              if (statenegativenormalize_value < 0.0) {
                statenegativenormalize_value = 0.0;
              }
              else {
                statenegativenormalize_value = statenegativenormalize_value > 100 ? 100 : statenegativenormalize_value;
              }
            }
            // --------------------------------------------------- //
            this.normalizedscore.push({
              goal_name: this.indicatordata[index].goal_name,
              goal_id: this.indicatordata[index].goal_id,
              district_indicator_desc: this.indicatordata[index].district_indicator_desc,
              dept_id: this.indicatordata[index].dept_id,
              baseline_value: this.indicatordata[index].baseline_value,
              indicators_value: this.indicatordata[index].indicators_value,
              kpi_target2030: this.indicatordata[index].kpi_target2030,
              cg_average_value: this.indicatordata[index].cg_value,
              cg_average_score: statenegativenormalize_value,
              kpi_negation: this.indicatordata[index].kpi_negation,
              dif_maxvalue: this.indicatordata[index].dif_maxvalue,
              dif_minvalue: this.indicatordata[index].dif_minvalue,
              indicount: this.indicatordata[index].indicount,
              district_code: this.indicatordata[index].district,
              valueyear: this.indicatordata[index].valueyear,
              normalize_value: negativenormalize_value,
              district_indicator_master_id: this.indicatordata[index].district_indicator_master_id
            });
          }
          else {
            let positivenormalize_value = ((this.indicatordata[index].indicators_value - this.indicatordata[index].dif_minvalue) / (this.indicatordata[index].kpi_target2030 - this.indicatordata[index].dif_minvalue));
            positivenormalize_value = ((isNaN(positivenormalize_value) ? 1 : positivenormalize_value) * 100);
            if (this.indicatordata[index].dif_minvalue > this.indicatordata[index].kpi_target2030) {
              positivenormalize_value = 100.0;
            }
            else {
              if (positivenormalize_value < 0.0) {
                positivenormalize_value = 0.0;
              }
              else {
                positivenormalize_value = (positivenormalize_value > 100 ? 100 : positivenormalize_value);
              }
            }

             // -----------------STATE AVERAGE CALCULATION (POSITIVE)------------------------------ //

            let statepositivenormalize_value = ((this.indicatordata[index].cg_value - this.indicatordata[index].dif_minvalue) / (this.indicatordata[index].kpi_target2030 - this.indicatordata[index].dif_minvalue));
            statepositivenormalize_value = ((isNaN(statepositivenormalize_value) ? 1 : statepositivenormalize_value) * 100);
            if (this.indicatordata[index].dif_minvalue > this.indicatordata[index].kpi_target2030) {
              statepositivenormalize_value = 100.0;
            }
            else {
              if (statepositivenormalize_value < 0.0) {
                statepositivenormalize_value = 0.0;
              }
              else {
                statepositivenormalize_value = (statepositivenormalize_value > 100 ? 100 : statepositivenormalize_value);
              }
            }

            this.normalizedscore.push({
              goal_name: this.indicatordata[index].goal_name,
              goal_id: this.indicatordata[index].goal_id,
              district_indicator_desc: this.indicatordata[index].district_indicator_desc,
              dept_id: this.indicatordata[index].dept_id,
              baseline_value: this.indicatordata[index].baseline_value,
              indicators_value: this.indicatordata[index].indicators_value,
              kpi_target2030: this.indicatordata[index].kpi_target2030,
              cg_average_value: this.indicatordata[index].cg_value,
              cg_average_score: statepositivenormalize_value,
              kpi_negation: this.indicatordata[index].kpi_negation,
              dif_maxvalue: this.indicatordata[index].dif_maxvalue,
              dif_minvalue: this.indicatordata[index].dif_minvalue,
              indicount: this.indicatordata[index].indicount,
              district_code: this.indicatordata[index].district,
              valueyear: this.indicatordata[index].valueyear,
              normalize_value: positivenormalize_value,
              district_indicator_master_id: this.indicatordata[index].district_indicator_master_id
            });
          }
        }

        //------------------------INSERT----------------------//

        this.ds.postData('populate/dif_normalize_insert', this.normalizedscore).subscribe(res => 
        {
          this.data = res;
          if (this.data) 
          {
            Swal.fire({
              icon: "success",
              text: 'Populate Succesfully',
              timer: 4000
            });
          }
        });
      });
      // for (var index in this.normalizedscore) {
      console.log("heloo123", this.normalizedscore.length, this.normalizedscore);
      // }
    }//last  
  }



}//last-line
