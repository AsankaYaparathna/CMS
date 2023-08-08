import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs';
import { io } from 'socket.io-client';
import { ChatRespoce } from 'src/app/model/chat.model';
import { UserModel } from 'src/app/model/user.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { ComplaintService } from 'src/app/services/complain/complaint.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss'],
})
export class AdminChatComponent implements OnInit {
  SOCKET_ENDPOINT = environment.baseUrl;
  socket: any;
  message!: string;
  msgs: any;

  LogedUser: string = <string>(
    (sessionStorage.getItem('userName') !== null
      ? sessionStorage.getItem('userName')
      : '')
  );

  UserData: UserModel | undefined;

  dataSource!: MatTableDataSource<Array<UserModel>>;
  private allItemSub!: Subscription;
  AllUser: any[] = [];
  MainChat: any[] = [];
  AllChat: any[] = [];
  MainRecever =
    <string>sessionStorage.getItem('recever') !== ''
      ? sessionStorage.getItem('recever')
      : '';

  constructor(
    private commonsevice: CommonServiceService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private cmpService: ComplaintService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.commonsevice.getUser(this.LogedUser).subscribe((res) => {
      this.UserData = res[0];
    });

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
    this.setupSocketConnection();

    this.loadTable();
    console.log(this.AllUser);
    console.log(this.MainRecever);
  }

  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        var reData: ChatRespoce = JSON.parse(data);
        this.AllChat.push(reData);

        if (reData.sender === this.MainRecever) {
          const element = document.createElement('li');
          element.innerHTML = reData.msg;
          element.style.background = '#ada1a1';
          element.style.padding = '15px 30px';
          element.style.margin = '10px';
          element.style.borderRadius = '5px';

          const msg = document.getElementById('message-list');

          if (msg != null) {
            msg.appendChild(element);
          } else {
            console.log('non setupSocketConnection child');
          }
        } else {
          console.log('non setupSocketConnection master');
        }
      }
    });
  }

  SendMessage() {
    var send = {
      sender: this.UserData?.username,
      recever: this.MainRecever,
      msg: this.message,
    };

    this.socket.emit('message', JSON.stringify(send));

    const element = document.createElement('li');
    var msg = document.getElementById('message-list');
    element.innerHTML = this.message;
    element.style.background = '#6d8ccc';
    element.style.color = 'black';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    element.style.borderRadius = '5px';
    msg?.appendChild(element);
    this.message = '';
  }

  private loadTable(): void {
    this.allItemSub = this.commonsevice.getAllCompl().subscribe(
      (result) => {
        this.dataSource = result;
        this.AllUser.push(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  chatSelector(recever: string): void {
    sessionStorage.setItem('recever', recever);
    window.location.reload();
  }
}
