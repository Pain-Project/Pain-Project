import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { PROBLEMS } from '../../TestingDashboard/Problems';
import { COMPLETED } from '../../TestingDashboard/Completed';
import { AWAITS } from '../../TestingDashboard/Awaits';


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
