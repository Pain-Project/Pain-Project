import { Component, OnInit } from '@angular/core';

import { Client } from "../../../models/client.model";
import { ClientsService } from "../../../services/clients.service";

// @use '@angular/material' as mat;
// $my-palette: mat.$indigo-palette;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients : Client[] = [];

  constructor(private service : ClientsService) { }

  ngOnInit(): void {
    this.clients  = this.service.findAllClients();
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
}
