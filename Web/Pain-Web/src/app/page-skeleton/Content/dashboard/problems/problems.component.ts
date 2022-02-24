import { Component, OnInit } from '@angular/core';
import { PROBLEMS } from '../../../TestingDashboard/Problems';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class ProblemsComponent implements OnInit {

  constructor() { }
  problems = PROBLEMS;
  ngOnInit(): void {
  }

}
