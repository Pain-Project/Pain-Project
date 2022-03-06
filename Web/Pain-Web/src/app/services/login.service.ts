import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: loginUser = {
    name: 'Alfons',
    surname: 'Velký',
    email: 'alfons.big@sssvt.cz',
    darkMode: false,
    loginName: 'aflikVelKy',
    createDate: '10.4.1998',
  };
  constructor() { }

  GetLogin() : loginUser {
    return this.user;
  }
  ChangeTheme(state : boolean) : void {
    this.user.darkMode = !this.user.darkMode;
  }
}
export interface loginUser {
  name: string;
  surname: string;
  email: string;
  darkMode: boolean;
  loginName: string;
  createDate : string;
  // emailFreq : string;
  // logFreq : string;
  // configFreq : string;
}
