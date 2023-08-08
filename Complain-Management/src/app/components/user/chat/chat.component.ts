import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie';
import { io } from 'socket.io-client';
import { ChatRespoce } from 'src/app/model/chat.model';
import { UserModel } from 'src/app/model/user.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  SOCKET_ENDPOINT = environment.baseUrl;
  socket: any;
  message!: string;
  msgs: any;

  AllChat: ChatRespoce[] = [];

  LogedUser: string = <string>(
    (sessionStorage.getItem('userName') !== null
      ? sessionStorage.getItem('userName')
      : '')
  );

  ChatDivStatus: boolean = <boolean>(
    (sessionStorage.getItem('btnChat') !== null ? true : false)
  );

  UserData: UserModel | undefined;

  constructor(
    private cookieService: CookieService,
    private commonsevice: CommonServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
  }

  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        var reData: ChatRespoce = JSON.parse(data);

        if (reData.recever == this.UserData?.username) {
          this._snackBar.open('Receved new Massage!', 'Ok', {
            duration: 3000,
          });
          if (!this.ChatDivStatus) {
            this.AllChat.push(reData);
            this._snackBar.open('Receved new Massage!', 'Ok', {
              duration: 3000,
            });
          } else {
            if (this.AllChat.length > 0) {
              for (let x of this.AllChat) {
                this.LoardRecevedMSG(x.msg);
              }
              this.AllChat = [];
            }

            this.LoardRecevedMSG(reData.msg);
          }
        }
      } else {
        console.log('non setupSocketConnection master');
      }
    });
  }

  LoardRecevedMSG(receveMsg: string): void {
    const element = document.createElement('li');
    element.innerHTML = receveMsg;
    element.style.background = '#ada1a1';
    element.style.padding = '15px 30px';
    element.style.color = 'black';
    element.style.margin = '10px';
    element.style.borderRadius = '5px';
    const msg = document.getElementById('message-list');
    if (msg != null) {
      msg.appendChild(element);
    } else {
      console.log('non setupSocketConnection child');
    }
  }

  SendMessage() {
    var send = {
      sender: this.UserData?.username,
      recever: 'admin',
      msg: this.message,
    };

    
    this.socket.emit('message', JSON.stringify(send));

    this.socket.emit('user', this.UserData?.username);
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
}
