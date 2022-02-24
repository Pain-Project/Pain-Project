import { Component, OnInit } from '@angular/core';
import { AWAITS } from '../../../TestingDashboard/Awaits';

@Component({
  selector: 'app-awaits',
  templateUrl: './awaits.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class AwaitsComponent implements OnInit {
  awaits = AWAITS;
  constructor() { }

  ngOnInit(): void {
  }

}
