import { Component, OnInit } from '@angular/core';
import { Config} from "../../../../Testing/ConfigInterface";
import { CONFIGS} from "../../../../Testing/Configs";
import { CLIENTS} from "../../../../Testing/Clients";

import { MatDialog} from "@angular/material/dialog";

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
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '800px'
    })
  }
}
// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'Dialog-Add-Client.html',
  styleUrls: ['./Dialog-Add-Client.scss']
})
export class DialogElementsExampleDialog {
  constructor() {
  }
  clients = CLIENTS;
}
