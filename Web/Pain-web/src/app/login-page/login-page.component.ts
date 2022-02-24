import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  hide = true;
  name = '';
  password = '';


  constructor(private router : Router,) { }

  ngOnInit(): void {
  }
  buttonOpen(event : any): void {
    event.stopPropagation();
  }
  Submit() : void {
    // location.pathname='ui/dashboard';
    this.router.navigate([ 'ui/dashboard' ]);

  }
}
