import { Component, OnInit } from '@angular/core';
import { COMPLETED } from '../../../TestingDashboard/Completed';
import { AWAITS } from '../../../TestingDashboard/Awaits';

@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class GrafComponent implements OnInit {
  completed = COMPLETED;
  awaits = AWAITS;
  constructor() { }

  ngOnInit(): void {
  }

}
