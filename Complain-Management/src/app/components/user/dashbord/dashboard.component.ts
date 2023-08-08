import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { UserModel } from 'src/app/model/user.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  componentName ="dashboad"
  navSate = true;
  constructor(private authService: CommonServiceService,
    private cookieService: CookieService
    ) {}
  BtnEditProfile = false;
  BtnAddNewComplain = false;
  BtnChat = true;

  LogedUser: string = <string>(
    (sessionStorage.getItem("userName") !== null
      ? sessionStorage.getItem("userName")
      : "")
  );


  UserData :UserModel | undefined;



  ngOnInit(): void {
    this.authService
      .getUser(this.LogedUser)
      .subscribe((res ) => {
     
         this.UserData = res[0];
         
        
      });
  }

  receiveNavState($event: boolean): void {
    this.navSate = $event;
  }
  btnChat(): void {
    this.BtnEditProfile = false;
    this.BtnAddNewComplain = false;
    this.BtnChat = true;

    sessionStorage.setItem('btnChat','on');
  }

  btnAddComplain(): void {
    this.BtnEditProfile = false;
    this.BtnAddNewComplain = true;
    this.BtnChat = false;
    sessionStorage.setItem('btnChat','off');

  }

  btnEditProfile(): void {
    this.BtnEditProfile = true;
    this.BtnAddNewComplain = false;
    this.BtnChat = false;
    sessionStorage.setItem('btnChat','off');

  }

  logout() {
    this.authService.logout();
  }

  
}
