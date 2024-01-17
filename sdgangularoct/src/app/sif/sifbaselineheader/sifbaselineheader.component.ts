import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sifbaselineheader',
  templateUrl: './sifbaselineheader.component.html',
  styleUrls: ['./sifbaselineheader.component.scss']
})
export class SifbaselineheaderComponent implements OnInit {

  public sifselectedGoal: any;
  public sifheaderform: FormGroup; //add  FormGroup 
  public params = new HttpParams();
  

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.sifheaderform = this.fb.group({ //definition to cons      
    });  
  }

  ngOnInit(): void { }

  goal1() {
    this.sifselectedGoal = 'Goal 1';
    this.ds.setGoal(this.sifselectedGoal);   
  }

  goal2() {
    this.sifselectedGoal = 'Goal 2';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal3() {
    this.sifselectedGoal = 'Goal 3';
    this.ds.setGoal(this.sifselectedGoal);
  }

  goal4() {
    this.sifselectedGoal = 'Goal 4';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal5() {
    this.sifselectedGoal = 'Goal 5';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal6() {
    this.sifselectedGoal = 'Goal 6';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal7() {
    this.sifselectedGoal = 'Goal 7';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal8() {
    this.sifselectedGoal = 'Goal 8';
    this.ds.setGoal(this.sifselectedGoal);
  }

  goal9() {
    this.sifselectedGoal = 'Goal 9';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal10() {
    this.sifselectedGoal = 'Goal 10';
    this.ds.setGoal(this.sifselectedGoal); 

  }

  goal11() {
    this.sifselectedGoal = 'Goal 11';
    this.ds.setGoal(this.sifselectedGoal); 

  }

  goal12() {
    this.sifselectedGoal = 'Goal 12';
    this.ds.setGoal(this.sifselectedGoal); 

  }

  goal13() {
    this.sifselectedGoal = 'Goal 13';
    this.ds.setGoal(this.sifselectedGoal); 

  }

  goal14() {
    this.sifselectedGoal = 'Goal 14';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal15() {
    this.sifselectedGoal = 'Goal 15';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal16() {
    this.sifselectedGoal = 'Goal 16';
    this.ds.setGoal(this.sifselectedGoal); 
  }

  goal17() {
    this.sifselectedGoal = 'Goal 17';
    this.ds.setGoal(this.sifselectedGoal); 
  }


}
