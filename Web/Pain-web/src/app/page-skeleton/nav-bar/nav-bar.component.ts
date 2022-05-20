import { Component, OnInit } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";
import { SettingsComponent} from "../../components/dialogs/settings-dialog/settings.component";
import {LoginService} from "../../services/login.service";
import {SessionsService} from "../../services/sessions.service";
import {Router} from "@angular/router";
import { EmailService } from 'src/app/services/email.service';
import { EmailSettingsModel } from 'src/app/models/emailSettings.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  name: string;
  surname: string;

  emailSettings: EmailSettingsModel;

  constructor( public dialog : MatDialog,
               private loginService : LoginService,
               private sessionService: SessionsService,
               private router: Router,
               private emailService: EmailService,
  ) { 
    this.emailService.GetEmailSettings().subscribe(x => this.emailSettings = x)
  }


  ngOnInit(): void {
    this.name = this.loginService.GetLogin().Name;
    this.surname = this.loginService.GetLogin().Surname;
  }
  LogOut() : void {
    this.sessionService.logout();
    this.router.navigate([''])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      panelClass: 'custom-dialog-container',
      width: '1000px',
      disableClose: true,
      data: this.emailSettings
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result== true)
        alert('Settings saved!');
    });
  }
}
