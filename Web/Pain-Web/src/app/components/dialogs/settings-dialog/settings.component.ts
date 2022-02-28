import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'Dialog_settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  selectedComp = 'one';
  selectedFreq = 'one';

  constructor() { }

  ngOnInit(): void {
  }

}
