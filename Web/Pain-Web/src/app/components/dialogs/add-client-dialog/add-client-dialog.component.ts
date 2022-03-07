import { Component, OnInit } from '@angular/core';
import {Client} from "../../../models/client.model";
import {ClientsService} from "../../../services/clients.service";

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss']
})
export class AddClientDialogComponent implements OnInit {
  cssClassIcon = 'NotActiveSearch';
  searchActive : boolean = false;
  searchedClient : string = '';
  clients : Client[] = [];

  checkedClients : Client[] = [];
  constructor(private service : ClientsService) { }

  ngOnInit(): void {
    this.clients = this.service.findAllClients();
  }

  ConfigCheck(isChecked: boolean, checkedClient : Client): void {
    if (isChecked) {
      // alert(checkedClient.name);
      this.checkedClients.push(checkedClient);
    }
    else {
      this.checkedClients = this.checkedClients.filter(x => x != checkedClient);
    }
}

  ActiveChange() : void {
    if (this.searchActive)
      this.searchedClient = '';
    this.searchActive= !this.searchActive;
    this.cssClassIcon = this.searchActive ? 'ActiveSearch':'NotActiveSearch'  ;
  }
}
