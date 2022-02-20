import { Component, OnInit } from '@angular/core';
import { CLIENTS} from "../../../../Testing/Clients";

// @use '@angular/material' as mat;
// $my-palette: mat.$indigo-palette;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients = CLIENTS;
  constructor() { }

  ngOnInit(): void {
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
}
