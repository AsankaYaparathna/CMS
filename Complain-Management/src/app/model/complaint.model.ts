export class ComplaintModel{
  private _cid: string;
  private _ctitle: string;
  private _cdesc: string;
  private _cdate: string;
  private _ctime: string;
  private _username : string;
  private _status : string;

  constructor(cid: string, ctitle: string, cdesc: string, cdate: string, ctime: string, username: string, status: string) {
    this._cid = cid;
    this._ctitle = ctitle;
    this._cdesc = cdesc;
    this._cdate = cdate;
    this._ctime = ctime;
    this._username = username;
    this._status = status;
  }

  get cid(): string {
    return this._cid;
  }

  set cid(value: string) {
    this._cid = value;
  }

  get ctitle(): string {
    return this._ctitle;
  }

  set ctitle(value: string) {
    this._ctitle = value;
  }

  get cdesc(): string {
    return this._cdesc;
  }

  set cdesc(value: string) {
    this._cdesc = value;
  }

  get cdate(): string {
    return this._cdate;
  }

  set cdate(value: string) {
    this._cdate = value;
  }

  get ctime(): string {
    return this._ctime;
  }

  set ctime(value: string) {
    this._ctime = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
