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
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AdminDashbordComponent } from './admin-dashbord.component';

describe('AdminDashbordComponent', () => {
  let component: AdminDashbordComponent;
  let fixture: ComponentFixture<AdminDashbordComponent>;
  
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
      declarations: [ AdminDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
