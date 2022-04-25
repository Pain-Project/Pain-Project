import { Component, OnInit } from '@angular/core';
import {Config} from "../../../models/config.model";

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent implements OnInit {

  type : string = '';
  // data : Config;

  constructor() {}

  ngOnInit(): void {
  }
}
