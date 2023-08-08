import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { UserModel } from 'src/app/model/user.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss'],
})
export class AdminDashbordComponent implements OnInit {
  navSate = true;
  constructor(
    private authService: CommonServiceService,
    private cookieService: CookieService
  ) {}
  BtnEditProfile = false;
  BtnAddNewComplain = false;
  BtnChat = true;

  LogedUser: string = <string>(sessionStorage.getItem('userName') !== null //Make a change
    ? sessionStorage.getItem('userName')
    : '');

  UserData: UserModel | undefined;

  ngOnInit(): void {
    console.log(this.LogedUser);

    this.authService.getUser(this.LogedUser).subscribe((res) => {
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
  }

  btnAddComplain(): void {
    this.BtnEditProfile = false;
    this.BtnAddNewComplain = true;
    this.BtnChat = false;
  }

  btnEditProfile(): void {
    this.BtnEditProfile = true;
    this.BtnAddNewComplain = false;
    this.BtnChat = false;
  }

  logout() {
    this.authService.logout();
  }
}
