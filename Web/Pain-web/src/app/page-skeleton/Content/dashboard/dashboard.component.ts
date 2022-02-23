import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { PROBLEMS } from '../../TestingDashboard/Problems';
import { COMPLETED } from '../../TestingDashboard/Completed';
import { AWAITS } from '../../TestingDashboard/Awaits';

import { Stats1dayComponent } from './stats1day/stats1day.component';
import { Stats7dayComponent } from './stats7day/stats7day.component';
import { ProblemsComponent } from './problems/problems.component';
import { AddconfigbuttonComponent } from './addconfigbutton/addconfigbutton.component';
import { GrafComponent } from './graf/graf.component';
import { CompletedComponent } from './completed/completed.component';
import { AwaitsComponent } from './awaits/awaits.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  problems = PROBLEMS;
  completed = COMPLETED;
  awaits = AWAITS;

  constructor() { }
  ngOnInit(): void {
  }
}
