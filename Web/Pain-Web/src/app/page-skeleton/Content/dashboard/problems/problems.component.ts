import { Component, OnInit } from '@angular/core';
import { LogsService } from "../../../../services/logs.service";
import * as moment from "moment/moment";
import {Router} from "@angular/router";
import {DasboardService} from "../../../../services/dasboard.service";

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class ProblemsComponent implements OnInit {

  constructor(private service : DasboardService, private router : Router) { }
  problems : any;
  ngOnInit(): void {
    this.service.TodayTasks().subscribe(x => this.problems = x.filter(y => y.state == 'Error'))
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
