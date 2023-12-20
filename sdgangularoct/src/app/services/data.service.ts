import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentyear: BehaviorSubject<number> = new BehaviorSubject<number>(2021); //Please set current year from here;
  public baseyear: BehaviorSubject<number> = new BehaviorSubject<number>(2015); //Please set base year from here;

  public currentyearindia: BehaviorSubject<number> = new BehaviorSubject<number>(2020);

  configUrl: any = environment.rootUrl;

  // Year Set for NITI AAYOG //
  selectedYear = new Subject();
  selectedYear$ = this.selectedYear.asObservable()
  
  setYear(year: any) {
    this.selectedYear.next(year);
  }

  // Year Set for CG dashboard //

  cgselectedYear = new Subject();
  cgelectedYear$ = this.cgselectedYear.asObservable();  

  cgsetYear(cgyear: any) {
    this.cgselectedYear.next(cgyear);
  }
  // Goal Set for SIF data //

  sifselectedGoal = new Subject();
  sifselectedGoal$ = this.sifselectedGoal.asObservable();  

  setGoal(goal: any) {
    this.sifselectedGoal.next(goal);
  }

  //---------Language-------------//

  public lang = new BehaviorSubject<string>('English');

  constructor(private http: HttpClient) { }

  changeLanguage(la: any) {
    this.lang.next(la);
  }

  // getData(): Observable<HttpResponse<any>> {
  //   return this.http.get(
  //     this.configUrl, { observe: 'response' });
  // }


  getData(functionName: any) {
    return this.http.get(this.configUrl + functionName)
  }

  paramFunction(functionName: any, params: any) {

    const url = environment.rootUrl + functionName + '/' + params;
    return this.http.get(url)
  }

  param2Function(functionName: any, params: any, params1: any) {

    const url = environment.rootUrl + functionName + '/' + params + '/' + params1;
    return this.http.get(url)
  }

  param3Function(functionName: any, params: any, params1: any, params2: any) {
        
    const url = environment.rootUrl + functionName + '/' + params + '/' + params1 + '/' + params2;
    return this.http.get(url)
  }

  param4Function(functionName: any, params: any, params1: any, params2: any, params3: any) {

    const url = environment.rootUrl + functionName + '/' + params + '/' + params1 + '/' + params2 + '/' + params3;
    return this.http.get(url)
  }

  postData(functionName: any, data: any) {
    return this.http.post(this.configUrl + functionName, data)
  }

  updateData(functionName: any, data: any) {
    return this.http.put(this.configUrl + functionName, data)
  }



}
