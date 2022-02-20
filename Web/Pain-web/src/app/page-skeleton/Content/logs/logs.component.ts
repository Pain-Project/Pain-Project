import { Component, OnInit } from '@angular/core';
import { LOGS } from "../../../../Testing/Logs"
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
logs = LOGS
  constructor() { }

  ngOnInit(): void {
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
}
