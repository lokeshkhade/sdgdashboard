import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manageindicator',
  templateUrl: './manageindicator.component.html',
  styleUrls: ['./manageindicator.component.scss']
})

export class ManageindicatorComponent implements OnInit {

  public manageindicator: FormGroup; //add  FormGroup 
  public allindicators: any = [];

  constructor(private fb: FormBuilder, private ds: DataService) 
  {  
    this.manageindicator = this.fb.group({ //definition to cons
      // valueyear: [+this.ds.currentyear.value, Validators.required]
    }); 

  }

  ngOnInit(): void {
    this.getallindicators();
  }

  getallindicators() {
    this.ds.getData('common/getalldifindicators').subscribe((res: any) => {
      this.allindicators = res;
    });
  }

}
