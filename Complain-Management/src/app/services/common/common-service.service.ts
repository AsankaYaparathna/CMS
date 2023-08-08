import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {UserModel} from "../../model/user.model";
import {Router} from "@angular/router";
import { ComplaintModel } from '../../model/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {


  Url = environment.baseUrl;
  username:any
  constructor(private http: HttpClient,private cookieService: CookieService,private router: Router) { }

  saveaComplaint(complaintDTO: ComplaintModel): Observable<any> {
    return this.http.post<any>(this.Url+'/complaint/savecoml', {
      cid: complaintDTO.cid,
      ctitle: complaintDTO.ctitle,
      cdesc: complaintDTO.cdesc,
      cdate: complaintDTO.cdate,
      ctime: complaintDTO.ctime,
      username: complaintDTO.username,
      status: complaintDTO.status,
    }, {
      headers:new HttpHeaders({

      })
    })
  }

  deleteaComplaint(cid:any): Observable<any> {
    return this.http.delete(this.Url+'/complaint/deletecompl/'+cid, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });
  }

  getAllCompl() : Observable<any> {
    return this.http.get(this.Url+'/user/alluser', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }

  logout() {
    this.cookieService.removeAll();
    this.router.navigateByUrl('/login');
  }

  getUser(username: any) : Observable<any> {
    return this.http.get(this.Url+'/user/specuser/'+username, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }

  getUserCompl() : Observable<any> {
    this.username = JSON.parse(<string>this.cookieService.get('Arr'))
    return this.http.get(this.Url+'/complaint/findbyuser/'+this.username[0].username, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }

  AddnewUser(userdto: UserModel): Observable<any> {
    return this.http.post<any>(this.Url+'/user/saveuser', {
      username: userdto.username,
      email: userdto.email,
      phoneNo1: userdto.phoneNo1,
      password: userdto.password,
    }, {
      headers:new HttpHeaders({})
    })
  }

  UpdateUser(userdto: UserModel,id: any): Observable<any> {
    return this.http.patch<any>(this.Url+'/user/updateuser/'+id, {
      username: userdto.username,
      email: userdto.email,
      phoneNo1: userdto.phoneNo1,
      password: userdto.password,
    }, {
      headers:new HttpHeaders({})
    })
  }
}
