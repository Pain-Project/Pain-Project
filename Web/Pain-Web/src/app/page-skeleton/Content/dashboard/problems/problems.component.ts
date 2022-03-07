import { Component, OnInit } from '@angular/core';
import { LogsService } from "../../../../services/logs.service";
import * as moment from "moment/moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class ProblemsComponent implements OnInit {

  constructor(private logsService : LogsService, private router : Router) { }
  problems : any;
  ngOnInit(): void {
    this.problems = this.logsService.findAllErrors();
  }
  format_time(s : string) {
    let now = moment(s);
    return ( now.format("HH:mm") );
  }
  scroll(id: number) {
    this.router.navigate(['/ui/logs', id]);
    const el = document.getElementById(id.toString());
    // @ts-ignore
    el.scrollIntoView();
  }
}
