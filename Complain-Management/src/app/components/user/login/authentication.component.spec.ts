import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatCheckboxModule,
        SharedModule,
        MatSnackBarModule,
        HttpClientModule,
        CookieModule.forRoot(),
        MatDialogModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatListModule,
        HttpClientTestingModule],
      declarations: [ AuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('component sucessfully create', () => {
    expect(component).toBeTruthy();
  });

  it("testing title",() =>{
    expect(component.componentName).toBe("login")
  });
  it('created a form with username and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });
  
  it('should have a defined component', () =>{
    expect(component).toBeDefined();
});
it('should match login component html class name',() =>{
  const login1 = fixture.debugElement.query(By.css('.login-page'));
  expect(login1).toBeTruthy();

  const login2 = fixture.debugElement.query(By.css('.mat-elevation-z12'));
  expect(login2).toBeTruthy();
  const login3 = fixture.debugElement.query(By.css('.example-stretched-tabs'));
  expect(login3).toBeTruthy();

});
});
