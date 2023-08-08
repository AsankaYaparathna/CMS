import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/user/login/authentication.component';

import { HomepageComponent } from './components/user/homepage/homepage.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ComplaintsComponent } from './components/user/complaints/complaints.component';
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
import {SharedModule} from "./core/shared/shared.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ChatComponent } from './components/user/chat/chat.component';
import { DashboardComponent } from './components/user/dashbord/dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminChatComponent } from './components/admin/admin-chat/admin-chat.component';
import { AdminDashbordComponent } from './components/admin/admin-dashbord/admin-dashbord.component';
import { AdminComplaintsComponent } from './components/admin/admin-complaints/admin-complaints.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminAddComplainComponent } from './components/admin/admin-add-complain/admin-add-complain.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    ChatComponent,
    HomepageComponent,
    UserProfileComponent,
    ComplaintsComponent,
    HeaderComponent,
    FooterComponent,
    AdminLoginComponent,
    AdminChatComponent,
    AdminDashbordComponent,
    AdminComplaintsComponent,
    AdminUserComponent,
    AdminAddComplainComponent,
  ],
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
    MatGridListModule ,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
