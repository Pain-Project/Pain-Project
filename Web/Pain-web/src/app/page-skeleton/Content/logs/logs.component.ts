import { Component, OnInit } from '@angular/core';
import {Log} from "../../../models/log.model";
import {LogsService} from "../../../services/logs.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  sum = 10;
  searchedLog : string = '';
  logs : Log[] = [];
  filterValue : string = 'none';

  constructor( private service : LogsService) {}

  ngOnInit(): void {
    this.logs =  this.service.findAllLogs();
  }
  onScrollDown(ev: any) {
    this.sum += 10;
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
}
