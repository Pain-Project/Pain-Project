import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  public  user : User = new User();
  public form : FormGroup;
  constructor(private fb : FormBuilder,
              private service: UsersService) { }

  ngOnInit(): void {
    this.form = this.createForm(this.user);
  }
  private createForm(user: User): FormGroup {
    return this.fb.group({
      name: [ user.name, Validators.required ],
      surname: [ user.surname, Validators.required ],
      login: [ user.login, Validators.required ],
      email: [ user.email, Validators.required ],
      password: [ user.password, Validators.required ],
      confirmPassword: [ user.password, Validators.required ],
      reports: [ user.cronEmail, Validators.required ],
    });
  }
  public submit() : void {
    this.service.addUser(this.form.value).subscribe();
  }
}
