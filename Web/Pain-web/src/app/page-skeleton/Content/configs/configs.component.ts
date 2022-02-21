import { Component, OnInit } from '@angular/core';
import { CONFIGS} from "../../../../Testing/Configs";
import { CLIENTS} from "../../../../Testing/Clients";

import { MatDialog } from "@angular/material/dialog";
import { RemoveDialogComponent } from "../../Shared/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

    configs = CONFIGS;
  constructor( public dialog : MatDialog) { }

  ngOnInit(): void {
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
export class DialogElementsExampleDialog {
  searchActive : boolean = false;
  constructor() {
  }
  clients = CLIENTS;
}
