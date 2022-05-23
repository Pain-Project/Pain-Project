import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LoginService, loginUser} from "../../../services/login.service";
import {UsersService} from "../../../services/users.service";
import {SessionsService} from "../../../services/sessions.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { EmailSettingsModel } from 'src/app/models/emailSettings.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'Dialog_settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: loginUser;
  darkMode: boolean;
  isDirty: boolean = false;
  hide = true;

  selectedComp = 'one';
  selectedFreq = 'one';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public form: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data:EmailSettingsModel,
    @Inject(DOCUMENT) private document: Document,
    private loginService: LoginService,
    private userService: UsersService,
    private sessionsService: SessionsService,
    private emailService: EmailService,
    private fb:FormBuilder,
  ) {
    this.form = this.fb.group({
      port:[this.data.port,Validators.required],
      smtp:[this.data.smtp, Validators.required],
      freq:[this.data.freq,Validators.required],
      sender:[this.data.sender, Validators.required],
      password:[this.data.password, Validators.required],
      ssl:[this.data.ssl, Validators.required],

      // port:[0,Validators.required],
      // smtp:['', Validators.required],
      // freq:[0,Validators.required],
      // sender:['', Validators.required],
    })
  }

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

  CancelClick(): void {


    if (this.user.Darkmode)
      this.document.body.classList.replace('light-theme', 'dark-theme')
    else
      this.document.body.classList.replace('dark-theme', 'light-theme')
  }

  SaveClick(): void {
    if (this.isDirty) {
      this.userService.darkmodeChange(this.darkMode).subscribe(() => this.sessionsService.reLog(this.loginService.GetLogin().Id).subscribe());
      ;
    }
    this.emailService.changeEmailSettings(this.form.value).subscribe();
  }
  buttonOpen(event : any): void {
    event.stopPropagation();
  }
  Submit(): void{
      console.log("ahoj");
      this.emailService.changeEmailSettings(this.form.value).subscribe();
  }
}

export type Theme = 'light-theme' | 'dark-theme';

