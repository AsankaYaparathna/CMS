export class UserModel{

  private _username: string;
  private _email: string;
  private _phoneNo1 : string;
  private _password : string;
  private _id : string;
  //private _img : ImageBitmap;

  constructor(username: string, email: string, phoneNo1: string, password: string, id : string) {
    this._username = username;
    this._email = email;
    this._phoneNo1 = phoneNo1;
    this._password = password;
    this._id = id;
    //this._img = img;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get UserId(): string {
    return this._id;
  }

  set UserId(value: string) {
    this._id = value;
  }
  
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNo1(): string {
    return this._phoneNo1;
  }

  set phoneNo1(value: string) {
    this._phoneNo1 = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  // get img(): ImageBitmap
  //  {
  //   return this._img;
  // }

  // set img(value: ImageBitmap) {
  //   this._img = value;
  // }

}
