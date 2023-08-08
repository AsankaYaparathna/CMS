import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/user/login/authentication.component";
import {DashboardComponent} from "./components/user/dashbord/dashboard.component";
import {HomepageComponent} from "./components/user/homepage/homepage.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {ComplaintsComponent} from "./components/user/complaints/complaints.component";
import { ChatComponent } from './components/user/chat/chat.component';
import { AdminDashbordComponent } from './components/admin/admin-dashbord/admin-dashbord.component';
import { AdminComplaintsComponent } from './components/admin/admin-complaints/admin-complaints.component';
import { AdminChatComponent } from './components/admin/admin-chat/admin-chat.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: AuthenticationComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path:'dashboard',component:DashboardComponent,children:[
      {path:'',component:HomepageComponent},
      {path: 'complaints', component: ComplaintsComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'profile', component: UserProfileComponent},
    ]},
  {path:'admin-dashboard',component:AdminDashbordComponent,children:[
    {path:'',component:HomepageComponent},
    {path: 'admin-complaints', component: AdminComplaintsComponent},
    {path: 'admin-chat', component: AdminChatComponent},
  ]},
  { path: 'shared', loadChildren: () => import('./core/shared/shared.module').then(m => m.SharedModule) },
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
