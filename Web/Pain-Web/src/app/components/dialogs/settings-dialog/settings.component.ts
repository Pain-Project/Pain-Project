import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LoginService, loginUser} from "../../../services/login.service";
import {UsersService} from "../../../services/users.service";
import {SessionsService} from "../../../services/sessions.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { EmailSettingsModel } from 'src/app/models/emailSettings.model';

@Component({
  selector: 'Dialog_settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: loginUser;
  darkMode: boolean;
  isDirty: boolean = false;

  selectedComp = 'one';
  selectedFreq = 'one';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public form: FormGroup;

  public emailSettings: EmailSettingsModel;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendered: Renderer2,
    private loginService: LoginService,
    private userService: UsersService,
    private sessionsService: SessionsService,
    private emailService: EmailService,
    private fb:FormBuilder,
  ) {
    this.emailService.GetEmailSettings().subscribe(x => {
      console.log(x)
      this.emailSettings = x;
    })
    this.form = this.fb.group({
      port:[this.emailSettings.Port,Validators.required],
      smtp:[this.emailSettings.SMTP, Validators.required],
      freq:[this.emailSettings.Freq,Validators.required],
      sender:[this.emailSettings.Sender, Validators.required],

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
  }
  Submit(): void{

  }
}

export type Theme = 'light-theme' | 'dark-theme';

