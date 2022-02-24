import { Component, OnInit } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";
import { RemoveDialogComponent } from "../../../components/dialogs/remove-dialog/remove-dialog.component";
import { ConfigsService } from "../../../services/configs.service";
import { Config } from "../../../models/config.model";
import { Client } from "../../../models/client.model";
import { ClientsService } from "../../../services/clients.service";


@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

  configs : Config[]  = [];
  constructor( public dialog : MatDialog, private configService : ConfigsService) { }

  ngOnInit(): void {
    this.configs = this.configService.findAllConfigs();
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
  openDialog(type : any): void {
    if (type== 'Add'){
      const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        panelClass: 'custom-dialog-container',
        width: '800px'
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
    }
  }
}
// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'Dialog-Add-Client.html',
  styleUrls: ['./Dialog-Add-Client.scss']
})

export class DialogElementsExampleDialog implements OnInit{
  searchActive : boolean = false;
  clients : Client[] = [];
  ngOnInit() : void {
    this.clients = this.service.findAllClients();
  }
  constructor(private service : ClientsService) {
  }
}
