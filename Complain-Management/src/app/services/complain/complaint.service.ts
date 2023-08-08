import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { ComplaintModel } from 'src/app/model/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

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

  updateaComplaint(complaintDTO: ComplaintModel): Observable<any> {
    return this.http.patch<any>(this.Url+'/complaint/updatecompl/'+complaintDTO.cid, {
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

  getAllCompl(): Observable<any> {
    return this.http.get(this.Url+'/complaint/allcompl', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }

  deleteaComplaint(cid:any) {
    return this.http.delete(this.Url+'/complaint/deletecompl/'+cid, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }
}
