import { Component, OnInit } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";
import { SettingsComponent} from "../../components/dialogs/settings-dialog/settings.component";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  name: string;
  surname: string;

  constructor( public dialog : MatDialog, private loginService : LoginService) { }


  ngOnInit(): void {
    this.name = this.loginService.GetLogin().name;
    this.surname = this.loginService.GetLogin().surname;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      panelClass: 'custom-dialog-container',
      width: '1000px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result== true)
        alert('Settings saved!');
    });
  }
}
