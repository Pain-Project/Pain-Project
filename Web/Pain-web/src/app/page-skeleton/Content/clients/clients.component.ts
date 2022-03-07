import {Component, OnInit} from '@angular/core';

import { Client } from "../../../models/client.model";
import { ClientsService } from "../../../services/clients.service";
import { MatDialog } from "@angular/material/dialog";
import { RemoveDialogComponent } from "../../../components/dialogs/remove-dialog/remove-dialog.component";
import { InterfaceClientsCanDeactivate } from "../../../Guards/interface-clients-can-deactivate";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, InterfaceClientsCanDeactivate {
  sum = 15;
  isDirty : boolean = false;
  searchedClient : string = '';
  filterValue : string = 'none';
  clients : Client[] = [];


  constructor(private service : ClientsService, public dialog : MatDialog) {}

  ngOnInit(): void {
    this.clients  = this.service.findAllClients();
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
  canDeactivate(): boolean {
    return !this.isDirty;
  }
  onScrollDown(ev: any) {
    this.sum += 15;
  }

  openDialog(type : any) : void {
    if (type=='client') {
      const dialogRef = this.dialog.open(RemoveDialogComponent, {
        panelClass: 'custom-dialog-container',
        width: '500px',
      })
      dialogRef.componentInstance.type = 'client';
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          alert('Client was successfully removed!')
      })
    }
    else if (type=='configFromClient') {
      const dialogRef = this.dialog.open(RemoveDialogComponent, {
        panelClass: 'custom-dialog-container',
        width: '500px',
      })
      dialogRef.componentInstance.type = 'configFromClient';
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          alert('Config was successfully removed!')
      })
    }
  }
}
