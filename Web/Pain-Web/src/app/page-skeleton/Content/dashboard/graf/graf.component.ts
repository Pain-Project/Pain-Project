import { Component, OnInit } from '@angular/core';
import {DasboardService} from "../../../../services/dasboard.service";

@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class GrafComponent implements OnInit {
  percent: string = '50';
  constructor(public service: DasboardService) {
    this.service.GetPercent().subscribe(x => this.percent = x.toFixed(0));
  }

  ngOnInit(): void {
  }

}
