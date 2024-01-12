import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainfooter',
  templateUrl: './mainfooter.component.html',
  styleUrls: ['./mainfooter.component.scss']
})
export class MainfooterComponent implements OnInit {

  public mainfooter: FormGroup; //add  FormGroup 
  public data: any = []; 
  public visitor_count : any;

  constructor(private fb: FormBuilder, private ds: DataService) 
  {
    this.mainfooter = this.fb.group({ //definition to cons
      visitor_count: ['', Validators.required]
    });
  }

  ngOnInit(): void 
  {
    this.getvisitorcount();
  }

  getvisitorcount() 
  {
    this.ds.getData('common/getvisitorcount').subscribe((res: any) => {
      this.visitor_count = res[0].visitor_count;
      this.visitorupdate(res[0].visitor_count);
    });
  }

  visitorupdate(visitorcount: any)
  {
    this.visitor_count = visitorcount + 1;  
    this.mainfooter.patchValue
      ({
        visitor_count: this.visitor_count,
      });    
      this.ds.updateData('crud/updatevisitorcount', this.mainfooter.value).subscribe(res => {
      this.data = res;     
    });
  }



}//last-line
