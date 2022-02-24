import { Component, OnInit } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";
import { SettingsComponent} from "../../components/dialogs/settings-dialog/settings.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor( public dialog : MatDialog) { }


  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      panelClass: 'custom-dialog-container',
      width: '800px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result== true)
        alert('Settings saved!')
    });
  }
}
