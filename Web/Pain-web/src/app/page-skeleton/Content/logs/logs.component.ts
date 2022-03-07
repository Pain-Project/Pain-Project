import { Component, OnInit } from '@angular/core';
import {Log} from "../../../models/log.model";
import {LogsService} from "../../../services/logs.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  sum = 15;
  searchedLog : string = '';
  logs : Log[] = [];
  filterValue : string = 'none';
  expandNumber : number;

  constructor( private service : LogsService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    if (id != undefined) {
      this.searchedLog = id;
      this.expandNumber = +id;
    }
    this.logs =  this.service.findAllLogs();
  }
  onScrollDown(ev: any) {
    this.sum += 15;
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
}
