import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Confirm} from "notiflix";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CommonServiceService} from "../../../services/common/common-service.service";
import * as Notiflix from 'notiflix';
import {CookieService} from "ngx-cookie";
import { ComplaintModel } from 'src/app/model/complaint.model';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserModel } from 'src/app/model/user.model';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today:any
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<ComplaintModel>>;
  displayedColumns: string[] = [ 'cid', 'ctitle', 'cdesc', 'cdate','ctime','status','action'];
  pageCount = 0;
  pageSizeOptions!: number[];
  tempPageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search = new Subject();
  private allItemSub!: Subscription;

  LogedUser: string = <string>(
    (sessionStorage.getItem("userName") !== null
      ? sessionStorage.getItem("userName")
      : "")
  );


  UserData :UserModel | undefined;

  BtnAddCom =false;


  constructor(private complaintService: CommonServiceService,private dialog: MatDialog
  ,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.complaintService
      .getUser(this.LogedUser)
      .subscribe((res ) => {
     
         this.UserData = res[0];
         
        
      });
    this.complaintDetailsForm = new FormGroup({
      ctitle: new FormControl('', [
        Validators.required
      ]),
      cdesc: new FormControl('', [
        Validators.required
      ])
    });

    this.refreshTable();

  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  Test($event: KeyboardEvent) {

  }


  saveComplaint() {
    this.complaintService.saveaComplaint(new ComplaintModel(
      "",
      this.complaintDetailsForm.get('ctitle')?.value,
      this.complaintDetailsForm.get('cdesc')?.value,
      new Date().toISOString().slice(0, 10),
      new Date().toLocaleTimeString(),
      <string>this.UserData?.username,
      "Pending",
    )).subscribe(result => {
      console.log("User Successfully Added")
      console.log(result)
      this.loadTable();
      this.resetfields();
      Notiflix.Notify.success('Complaint Successfully Added',{
        position: 'center-top'
      });
    }, error => {
      console.log(error);
    });
  }

  resetfields(){
    this.complaintDetailsForm.setValue({
      ctitle:'',
      cdesc:''
    })
  }

  refreshTable(): void {
    this.loadTable();
  }

  updateComplaint(row:any) {

  }

  deleteComplaint(row:any) {
    Confirm.show(
      'Confirm',
      'Do you want to Delete This Complaint?',
      'Yes',
      'No',
      () => {
        this.complaintService.deleteaComplaint(row.cid).subscribe(result => {
          console.log("Complaint Successfully deleted")
          console.log(result)
          this.loadTable();
          Notiflix.Notify.info('Complaint Successfully deleted',{
            position: 'center-top',
          });
        }, error => {
          console.log(error);
        });
      },
      () => {
        Notiflix.Notify.failure('Complaint Deletion Unsuccessfull ',{
          position: 'center-top',
        });
      },
      {
        titleColor: '#e74c3c',
        okButtonBackground: '#e74c3c',
        cancelButtonBackground: '#a9a9a9',

      },
    );
  }
  addNewCom():void{
    if(this.BtnAddCom){
      this.loadTable();
      this.BtnAddCom = false;
    }
    else{
      this.BtnAddCom = true;

    }
  }
  private loadTable(): void {
    this.allItemSub = this.complaintService.getUserCompl()
      .subscribe(result => {
        console.log("result")
        console.log(result)
        this.paginator.length = result.length;
        this.dataSource = result;
        // console.log(result.data);
      }, error => {
        console.log(error);
      });
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  getServerData($event: PageEvent): any {
    // this.loadTable();
  }

  DownloadPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Complain.pdf');
      window.location.reload();
    });
  }

}
