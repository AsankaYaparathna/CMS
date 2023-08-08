import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../../services/common/common-service.service';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  componentName = 'login';
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private commonServiceService: CommonServiceService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) {}
  farmerForm!: FormGroup;
  LoginForm!: FormGroup;
  ngOnInit(): void {
    this.farmerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.LoginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNo1: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signIn() {
    if (!this.farmerForm.valid) {
      return;
    }
    this.commonServiceService
      .getUser(this.farmerForm.get('username')?.value)
      .subscribe((res) => {
        if (res[0].password == this.farmerForm.get('password')?.value) {
          this._snackBar.open('Successfully Loged.!', 'Ok', {
            duration: 3000,
          });

          sessionStorage.setItem(
            'userName',
            this.farmerForm.get('username')?.value
          );

          this.router.navigate(['/dashboard']);
          this.cookieService.put('User', 'Customer');
          this.cookieService.put('Arr', JSON.stringify(res));
        } else {
        }
      });
  }

  addUser() {
    if (!this.LoginForm.valid) {
      console.log(this.LoginForm);

      return;
    }
    this.commonServiceService
      .AddnewUser(
        new UserModel(
          this.LoginForm.get('username')?.value,
          this.LoginForm.get('email')?.value,
          this.LoginForm.get('phoneNo1')?.value,
          this.LoginForm.get('password')?.value,
          ''
        )
      )
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this._snackBar.open('User account created.!', 'Ok', {
            duration: 3000,
          });
          window.location.reload();
        } else {
          console.log('Item Add Unsuccessful');
        }
      });
  }

  clearform() {
    this.LoginForm.setValue({
      password: '',
      username: '',
      phoneNo1: '',
      email: '',
    });
  }
}
