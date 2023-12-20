import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ApexAxisChartSeries, ApexPlotOptions, ApexStroke,
  ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import {
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive, ApexMarkers, ApexAnnotations,
  ApexGrid
} from "ng-apexcharts";
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sifbaseline',
  templateUrl: './sifbaseline.component.html',
  styleUrls: ['./sifbaseline.component.scss']
})
export class SifbaselineComponent implements OnInit {

  public goal: any;
  public goaldata: any = [];  
  public siftargetdata: any = [];  
  public siftargetdatadesc: any = [];  
  public sifindicatorvalues: any = [];
  public sifindicatorprogressyear: any = [];
  public sifindicator: any = [];  
  public centralschemes: any = []; 
  public stateschemes: any = []; 
  public sifmetadata: any = []; 

  public siftargetdatabyid: any = [];
  public sifindicatorvaluesbyid: any = [];

  public sifbaseline: FormGroup; //add  FormGroup 

  public isSectionVisible = false;

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private route: ActivatedRoute)
  { 
    this.sifbaseline = this.fb.group({ //definition to cons
      targets: ['', Validators.required]
    });

  }  

  ngOnInit(): void {
    this.goal='Goal 1';
    this.ds.paramFunction('sif/getsifgoalwisedata', this.goal).subscribe((res: any) => {
      this.goaldata = res;
    });

    this.ds.paramFunction('sif/getsiftargetdata', this.goal).subscribe((res: any) => {
      this.siftargetdata = res; //targetdropdown
    });    

    this.ds.paramFunction('sif/getcentralschemegoalwise', this.goal).subscribe((res: any) => {
      this.centralschemes = res;
    });

    this.ds.paramFunction('sif/getstateschemegoalwise', this.goal).subscribe((res: any) => {
      this.stateschemes = res;
    });


    ///////////////////////////////////////////

    this.ds.sifselectedGoal$.subscribe((data: any) => {
      this.isSectionVisible = false;
      this.goal = data
      this.ds.paramFunction('sif/getsifgoalwisedata', this.goal).subscribe((res: any) => {
        this.goaldata = res;        
        });

      this.ds.paramFunction('sif/getsiftargetdata', this.goal).subscribe((res: any) => {
        this.siftargetdata = res;
      });

      this.ds.paramFunction('sif/getcentralschemegoalwise', this.goal).subscribe((res: any) => {
        this.centralschemes = res;
      });

      this.ds.paramFunction('sif/getstateschemegoalwise', this.goal).subscribe((res: any) => {
        this.stateschemes = res;
      });
    }); 

    ///////////////////////////Not in USse////////////////////////////////////////

    this.ds.getData('sif/getallyearsifdata').subscribe((res: any) => {
      this.sifindicatorvalues = res;
    });

    this.ds.getData('sif/getsifindicatordata').subscribe((res: any) => {
      this.sifindicator = res;
      // for (let d of this.sifindicator) {
      //   console.log(d.indicator_desc);
      // }
    });
    ///////////////////////////////////////////////////////////////////////
  }//load-event-close

  goal1(indicatorid:any,goalid:any) {
    
    this.ds.paramFunction('sif/getsifmetadata', indicatorid).subscribe((res: any) => {
      this.sifmetadata = res;
    }); 

    this.ds.paramFunction('sif/getprogressyeardata', indicatorid).subscribe((res: any) => {
      this.sifindicatorprogressyear = res;
    }); 
  }

  // -------------------------------------------------//

  onTargetSelected(event: any)
  {
    this.isSectionVisible = true;
    this.ds.paramFunction('sif/getsiftargetdesc', event.value).subscribe((res: any) => {
      this.siftargetdatadesc = res;
    });  

    this.ds.paramFunction('sif/getsifindicatordatabytargetid', event.value).subscribe((res: any) => {
      this.siftargetdatabyid = res;
      
    });

    this.ds.paramFunction('sif/getallyearsifdatabytargetid', event.value).subscribe((res: any) => {
      this.sifindicatorvaluesbyid = res;
    });

  }

}
