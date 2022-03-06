import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user.model";
import { UsersService } from "../../../services/users.service";
import { MatDialog } from "@angular/material/dialog";
import { AddUserDialogComponent } from "../../../components/dialogs/add-user-dialog/add-user-dialog.component";
import {RemoveDialogComponent} from "../../../components/dialogs/remove-dialog/remove-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  sum = 10;
  searchedUser : string = '';
  users : User[] = [];
  constructor( private service : UsersService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.users = this.service.findAllUsers();
  }
  onScrollDown(ev: any) {
    this.sum += 10;
  }
  onClick(event : any) : void {
    event.stopPropagation();
  }
  openDialog () : void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '1000px'
    })
    dialogRef.afterClosed().subscribe( result => {

    })
  }
  removeDialog() : void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px'
    })
    dialogRef.componentInstance.type = 'user';
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        alert('User was successfully removed!')
    })
  }
}
