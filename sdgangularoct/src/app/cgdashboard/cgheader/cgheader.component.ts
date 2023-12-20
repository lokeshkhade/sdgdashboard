import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cgheader',
  templateUrl: './cgheader.component.html',
  styleUrls: ['./cgheader.component.scss']
})
export class CgheaderComponent implements OnInit {

  public G1: any;
  public G2 : any;
  public G3: any;
  public G4: any;
  public G5: any;
  public G6: any;
  public G7: any;
  public G8: any;
  public G9: any;
  public G10: any;
  public G11: any;
  public G12: any;
  public G13: any;
  public G15: any;
  public G16: any;

  public cgyear: any;
  public cgyear1: any;

  public cgmainheader: FormGroup; //add  FormGroup 

  constructor(private fb: FormBuilder, public ds: DataService) { 
    this.cgmainheader = this.fb.group({ //definition to cons
    });

  }

  ngOnInit(): void {   
    this.cgyear = this.ds.currentyear.value;
    this.getcggoalscoreyearwise(this.cgyear);
    this.ds.cgelectedYear$.subscribe((data: any) => {
      this.cgyear = data     
      this.getcggoalscoreyearwise(this.cgyear)
    }); 
  }

  getcggoalscoreyearwise(cgyear1: any) {
    this.ds.paramFunction('data/getcggoalscoreyearwise', cgyear1).subscribe((res: any) => {

      for (var index in res) {
        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 1")
        {
            if (res[index].goalscore <= 49) {
              this.G1= '#dd1e47';
              
            }
            else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
              this.G1= '#ffc40c';
              
            }
            else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
              this.G1= '#00a084';
              
            }
            else if (res[index].goalscore >= 100) {
              this.G1= '#00aeef';              
            }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 2") {
          if (res[index].goalscore <= 49) {
            this.G2 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G2 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G2 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G2 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 3") {
          if (res[index].goalscore <= 49) {
            this.G3 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G3 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G3 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G3 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 4") {
          if (res[index].goalscore <= 49) {
            this.G4 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G4 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G4 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G4 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 5") {
          if (res[index].goalscore <= 49) {
            this.G5 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G5 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G5 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G5 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 6") {
          if (res[index].goalscore <= 49) {
            this.G6 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G6 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G6 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G6 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 7") {
          if (res[index].goalscore <= 49) {
            this.G7 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G7 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G7 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G7 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 8") {
          if (res[index].goalscore <= 49) {
            this.G8 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G8 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G8 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G8 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 9") {
          if (res[index].goalscore <= 49) {
            this.G9 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G9 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G9 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G9 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 10") {
          
          if (res[index].goalscore <= 49) {
            this.G10 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G10 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {           
            this.G10 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G10 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 11") {
          if (res[index].goalscore <= 49) {
            this.G11 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G11 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G11 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G11 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 12") {
          if (res[index].goalscore <= 49) {
            this.G12 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G12 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G12 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G12 = '#00aeef';
          }
        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 13") {
          if (res[index].goalscore <= 49) {
            this.G13 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G13 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G13 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G13 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 15") {
          if (res[index].goalscore <= 49) {
            this.G15 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G15 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G15 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G15 = '#00aeef';
          }

        }

        if (res[index].district_code == "CG01" && res[index].goal_id == "Goal 16") {
          if (res[index].goalscore <= 49) {
            this.G16 = '#dd1e47';
          }
          else if (res[index].goalscore >= 50 && res[index].goalscore <= 64) {
            this.G16 = '#ffc40c';
          }
          else if (res[index].goalscore >= 65 && res[index].goalscore <= 99) {
            this.G16 = '#00a084';
          }
          else if (res[index].goalscore >= 100) {
            this.G16 = '#00aeef';
          }

        }
      }//for-loop     
    });
  }

}
