import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user.model";
import { UsersService } from "../../../services/users.service";
import { MatDialog } from "@angular/material/dialog";
import { AddUserDialogComponent } from "../../../components/dialogs/add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users : User[] = [];
  constructor( private service : UsersService, private dialog : MatDialog) { }


  ngOnInit(): void {
    this.users = this.service.findAllUsers();
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
}
