import { Component, OnInit } from '@angular/core';
import { COMPLETED } from '../../../TestingDashboard/Completed';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class CompletedComponent implements OnInit {
  completed = COMPLETED;
  constructor() { }

  ngOnInit(): void {
  }

}
