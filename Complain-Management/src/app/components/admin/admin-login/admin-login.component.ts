import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserModel } from 'src/app/model/user.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private commonServiceService: CommonServiceService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) {}
  farmerForm!: FormGroup;
  LoginForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

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
    if (this.farmerForm.get('username')?.value === 'admin') {
      this.commonServiceService
        .getUser(this.farmerForm.get('username')?.value)
        .subscribe((res) => {
          if (res[0].password == this.farmerForm.get('password')?.value) {
            //console.log(res[0].password);
            
            sessionStorage.setItem(
              'userName',
              this.farmerForm.get('username')?.value
            );
            this.router.navigate(['/admin-dashboard']);
            this.cookieService.put('User', 'Customer');
            this.cookieService.put('Arr', JSON.stringify(res));
          } else {
            this.openSnackBar();
          }
        });
    }
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Wrong Credentials', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar', 'login-snackbar'],
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
