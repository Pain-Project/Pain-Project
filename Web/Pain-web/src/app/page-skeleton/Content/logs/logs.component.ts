import { Component, OnInit } from '@angular/core';
import {Log} from "../../../models/log.model";
import {LogsService} from "../../../services/logs.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs : Log[] = [];

  constructor( private service : LogsService) {  }

  ngOnInit(): void {
    this.logs =  this.service.findAllLogs();
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
}
