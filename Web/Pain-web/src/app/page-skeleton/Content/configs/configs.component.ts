import { Component, OnInit } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";
import { RemoveDialogComponent } from "../../../components/dialogs/remove-dialog/remove-dialog.component";
import { ConfigsService } from "../../../services/configs.service";
import { Config } from "../../../models/config.model";
import { AddClientDialogComponent } from "../../../components/dialogs/add-client-dialog/add-client-dialog.component";

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {
  sum = 15;
  searchedClient : string = '';
  configs : Config[]  = [];

  constructor( public dialog : MatDialog, private configService : ConfigsService) {}

  ngOnInit(): void {
    this.configs = this.configService.findAllConfigs();
  }
  onScrollDown(ev: any) {
    this.sum += 15;
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
  openDialog(type : any): void {
    if (type== 'Add'){
      const dialogRef = this.dialog.open(AddClientDialogComponent, {
        panelClass: 'custom-dialog-container',
        width: '800px'
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result.length != 0)
          alert(result);
      })
    }
    else if (type=='Remove'){
      const dialogRef = this.dialog.open(RemoveDialogComponent, {
        panelClass: 'custom-dialog-container',
        width: '500px',
      })
      dialogRef.componentInstance.type = 'config';
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          alert('Config was successfully removed!')
      })
    }
    else if (type=='RemoveClient'){
      const dialogRef = this.dialog.open(RemoveDialogComponent, {
        panelClass: 'custom-dialog-container',
        width: '500px'
      })
      dialogRef.componentInstance.type = 'clientFromConfig';
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          alert('Client was successfully removed!')
      })
    }
  }
}
