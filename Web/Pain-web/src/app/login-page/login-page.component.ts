import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  hide = true;
  name = '';
  password = '';

  constructor() { }

  ngOnInit(): void {
  }
  buttonOpen(event : any): void {
    event.stopPropagation();
  }
  Submit() : void {
    location.pathname='ui/dashboard';
  }
}
