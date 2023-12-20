import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MENUITEMS } from './menu';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  mobileQuery: MediaQueryList;
  public menuItems: any;
  public userrole: any;
  private _mobileQueryListener: () => void;
  public currentUser: any; public status: any;

  constructor
  (   changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,      public platform: Platform,    private router: Router,  private authService: AuthService) 
      {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
      }

  ngOnInit() 
  {
     this.currentUser = this.authService.currentUser;
     this.status = 1 ;//this.currentUser.status;
      //this.currentUser.role  = 1;
      //this.userrole = "SPC ADMIN";
    if (this.currentUser.role == 1)
    {
      this.userrole = "SPC ADMIN";
    }
    if (this.currentUser.role == 2) 
    {
        this.userrole = "HOD Admin";
    }
    if (this.currentUser.role == 3) 
    {
      this.userrole = "Department Admin";
    }
    if (this.currentUser.role == 4) 
    {
      this.userrole = "Data Entry";
    }
    if (this.currentUser.role == 4) 
    {
      this.userrole = "District Admin";
    }   
    // if (this.status == 0) {      
    // }
    // else {
    //   this.menuItems = MENUITEMS[this.currentUser.role];
    // }
     this.menuItems = MENUITEMS[this.currentUser.role];
  }

  ngOnDestroy(): void 
  {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() { }

  logout() 
  {
    this.authService.logout();
  }
}

