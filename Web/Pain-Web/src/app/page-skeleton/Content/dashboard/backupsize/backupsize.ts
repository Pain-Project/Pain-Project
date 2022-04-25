import {Component, OnInit} from '@angular/core';
import {DasboardService} from "../../../../services/dasboard.service";

@Component({
  selector: 'app-backupsize',
  templateUrl: './backupsize.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class Backupsize implements OnInit {
  size: number = 0;

  constructor(public service: DasboardService) {
    this.service.GetSize().subscribe(x => this.size = x);
  }

  ngOnInit(): void {
  }

}
