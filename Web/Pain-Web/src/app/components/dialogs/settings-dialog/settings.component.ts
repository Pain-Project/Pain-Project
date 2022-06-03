import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LoginService, loginUser} from "../../../services/login.service";
import {UsersService} from "../../../services/users.service";
import {SessionsService} from "../../../services/sessions.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailService} from 'src/app/services/email.service';
import {EmailSettingsModel} from 'src/app/models/emailSettings.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from "@angular/router";

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
    @Inject(MAT_DIALOG_DATA) public data: EmailSettingsModel,
    @Inject(DOCUMENT) private document: Document,
    private loginService: LoginService,
    private userService: UsersService,
    private sessionsService: SessionsService,
    private emailService: EmailService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SettingsComponent>,
    private router: Router,
  ) {
    this.form = this.fb.group({
      port: [this.data.port, Validators.required],
      smtp: [this.data.smtp, Validators.required],
      freq: [this.data.freq, Validators.required],
      sender: [this.data.sender, Validators.required],
      password: [this.data.password, Validators.required],
      ssl: [this.data.ssl, Validators.required],
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

  SaveClick(): any {
    if (this.isDirty) {
      this.userService.darkmodeChange(this.darkMode).subscribe(() => {
        this.sessionsService.reLog(this.loginService.GetLogin().Id).subscribe(() => {
          this.dialogRef.close();
          alert('Settings saved!');
          this.Reload();
        })
      });
    }
    if (this.form.touched) {
      if (this.form.get('port')?.value < 1) {
        alert('Port must be higher than zero!');
        return;
      }
      if (!RegExp(/^[a-zA-Z0-9.^_`-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/).test(this.form.get('sender')?.value) && !!this.form.get('sender')?.touched) {
        alert('Please enter valid email!');
        return;
      }
      this.emailService.changeEmailSettings(this.form.value).subscribe();
      this.dialogRef.close(true);
      return;
    }
    this.dialogRef.close(false);
  }

  buttonOpen(event: any): void {
    event.stopPropagation();
  }

  private Reload(): void {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

export type Theme = 'light-theme' | 'dark-theme';

