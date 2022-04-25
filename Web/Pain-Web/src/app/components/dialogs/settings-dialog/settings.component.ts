import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LoginService, loginUser} from "../../../services/login.service";
import {UsersService} from "../../../services/users.service";


@Component({
  selector: 'Dialog_settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user : loginUser;
  darkMode : boolean;
  isDirty : boolean = false;

  selectedComp = 'one';
  selectedFreq = 'one';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendered: Renderer2,
    private loginService : LoginService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.GetLogin();
    this.darkMode = this.user.Darkmode;
  }
  SwitchTheme(): void {
    this.isDirty = true;
    if (this.darkMode)
      this.document.body.classList.replace('light-theme', 'dark-theme')
    else
      this.document.body.classList.replace('dark-theme', 'light-theme')
  }
  CancelClick() : void {


    if (this.user.Darkmode)
      this.document.body.classList.replace('light-theme', 'dark-theme')
    else
      this.document.body.classList.replace('dark-theme', 'light-theme')
  }
  SaveClick() : void {
    if (this.isDirty)
      this.userService.darkmodeChange(this.darkMode).subscribe();
  }
}
export type Theme = 'light-theme' | 'dark-theme';

