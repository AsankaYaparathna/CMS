import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { ComplaintModel } from 'src/app/model/complaint.model';
import * as Notiflix from 'notiflix';
import { Confirm } from 'notiflix';
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { CookieService } from 'ngx-cookie';
import { ComplaintService } from 'src/app/services/complain/complaint.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-admin-complaints',
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.scss'],
})
export class AdminComplaintsComponent implements OnInit {
  
  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today: any;
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<ComplaintModel>>;
  displayedColumns: string[] = [
    'cid',
    'ctitle',
    'cdesc',
    'cdate',
    'ctime',
    'status',
    'action',
  ];
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
  constructor(
    private commonsevice: CommonServiceService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private cmpService: ComplaintService
  ) {}

  ngOnInit(): void {

    this.commonsevice
      .getUser(this.LogedUser)
      .subscribe((res ) => {
     
         this.UserData = res[0];
         
        
      });

    this.filterComplaintsForm = new FormGroup({
      ctitle: new FormControl('', [Validators.required]),
      cdesc: new FormControl('', [Validators.required]),
    });

    this.refreshTable();

   
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  Test($event: KeyboardEvent) {}

  saveComplaint() {
    this.commonsevice
      .saveaComplaint(
        new ComplaintModel(
          '',
          this.complaintDetailsForm.get('ctitle')?.value,
          this.complaintDetailsForm.get('cdesc')?.value,
          new Date().toISOString().slice(0, 10),
          new Date().toLocaleTimeString(),
          <string>this.UserData?.username,
          'Pending'
        )
      )
      .subscribe(
        (result) => {
          console.log('User Successfully Added');
          console.log(result);
          this.loadTable();
          this.resetfields();
          Notiflix.Notify.success('Complaint Successfully Added', {
            position: 'center-bottom',
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  resetfields() {
    this.complaintDetailsForm.setValue({
      ctitle: '',
      cdesc: '',
    });
  }

  refreshTable(): void {
    this.loadTable();
  }

  updateComplaint(row: any) {}

  deleteComplaint(row: any) {
    Confirm.show(
      'Confirm',
      'Do you want to Delete This Complaint?',
      'Yes',
      'No',
      () => {
        this.cmpService.deleteaComplaint(row.cid).subscribe(
          (result) => {
            console.log('Complaint Successfully deleted');
            console.log(result);
            this.loadTable();
            Notiflix.Notify.info('Complaint Successfully deleted', {
              position: 'center-bottom',
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      () => {
        Notiflix.Notify.failure('Complaint Deletion Unsuccessfull ', {
          position: 'center-bottom',
        });
      },
      {
        titleColor: '#e74c3c',
        okButtonBackground: '#e74c3c',
        cancelButtonBackground: '#a9a9a9',
      }
    );
  }
  approveComplaint(row: any) {
    Confirm.show(
      'Confirm',
      'Do you want to Approve This Complaint?',
      'Yes',
      'No',
      () => {
        
        var model = <ComplaintModel>row;
        model.status = 'Approved';
        this.cmpService.updateaComplaint(row).subscribe(
          (result) => {
            console.log('Complaint Successfully Approved');
            console.log(result);
            this.loadTable();
            Notiflix.Notify.info('Complaint Successfully Approved', {
              position: 'center-bottom',
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      () => {
        Notiflix.Notify.failure('Complaint Deletion Unsuccessfull ', {
          position: 'center-bottom',
        });
      },
      {
        titleColor: '#e74c3c',
        okButtonBackground: '#e74c3c',
        cancelButtonBackground: '#a9a9a9',
      }
    );
  }

  closeComplaint(row: any) {
    Confirm.show(
      'Confirm',
      'Do you want to Close This Complaint?',
      'Yes',
      'No',
      () => {
        
        var model = <ComplaintModel>row;
        model.status = 'Closed';
        this.cmpService.updateaComplaint(row).subscribe(
          (result) => {
            console.log('Complaint Successfully Close');
            console.log(result);
            this.loadTable();
            Notiflix.Notify.info('Complaint Successfully Close', {
              position: 'center-bottom',
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      () => {
        Notiflix.Notify.failure('Complaint Close Unsuccessfull ', {
          position: 'center-bottom',
        });
      },
      {
        titleColor: '#e74c3c',
        okButtonBackground: '#e74c3c',
        cancelButtonBackground: '#a9a9a9',
      }
    );
  }

  private loadTable(): void {
    this.allItemSub = this.cmpService.getAllCompl().subscribe(
      (result) => {
        console.log('result');
        console.log(result);
        this.paginator.length = result.length;
        this.dataSource = result;
        // console.log(result.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });
  }

  getServerData($event: PageEvent): any {
    // this.loadTable();
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

  DownloadPDF(): void {
    let DATA: any = document.getElementById('htmlData');

    console.log();
    
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Complain.pdf');
     // window.location.reload();
    });
  }

}
