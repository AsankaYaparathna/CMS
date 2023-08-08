import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserModel } from 'src/app/model/user.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  componentName ="user_profile"
  farmerForm!: FormGroup;
  LoginForm!: FormGroup;
  constructor(private commonsevice: CommonServiceService,
    private cookieService: CookieService,
    private router : Router,
    private _snackBar: MatSnackBar,

    ) {}
    LogedUser: string = <string>(
      (sessionStorage.getItem("userName") !== null
        ? sessionStorage.getItem("userName")
        : "")
    );
  
  
    UserData :UserModel | undefined;
  
  ngOnInit(): void {
    this.commonsevice
      .getUser(this.LogedUser)
      .subscribe((res ) => {
     
         this.UserData = res[0];
         
        
      });
    this.LoginForm = new FormGroup({
      username: new FormControl(this.UserData?.username, [Validators.required]),
      email: new FormControl(this.UserData?.email, [Validators.required]),
      phoneNo1: new FormControl(this.UserData?.phoneNo1, [Validators.required]),
      password: new FormControl(this.UserData?.password, [Validators.required]),
    });   
    
  }
  addUser() {
    this.commonsevice
      .UpdateUser(
        new UserModel(
          this.LoginForm.get('username')?.value,
          this.LoginForm.get('email')?.value,
          this.LoginForm.get('phoneNo1')?.value,
          this.LoginForm.get('password')?.value,
          ''
        ),this.UserData?.UserId
      )
      .subscribe((res) => {
        console.log(res);
        if (res) {
          // this.UserData.email = this.LoginForm.get('email')?.value;
          // this.UserData.phoneNo1 = this.LoginForm.get('phoneNo1')?.value;
          // this.UserData.password = this.LoginForm.get('password')?.value;

          this._snackBar.open("Profile Updated!", "Sign in again", {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        } else {
          console.log('Profile update Unsuccessful');
        }
      });
  }
 
}
