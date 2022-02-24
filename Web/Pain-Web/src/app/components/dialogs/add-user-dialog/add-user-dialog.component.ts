import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  public  user : User = new User();
  public form : FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm(this.user);
  }
  private createForm(user: User): FormGroup {
    return this.fb.group({
      name: [ user.name, Validators.required ],
      surname: [ user.surname, Validators.required ],
      loginName: [ user.loginName, Validators.required ],
      email: [ user.email, Validators.required ],
      password: [ user.password, Validators.required ],
      confirmPassword: [ user.password, Validators.required ],
      reports: [ user.reports, Validators.required ],
      bigBoss: [ user.bigBoss, Validators.required ],
    });
  }
  public saveUser() : void {
    alert('User saved!');
  }
}
