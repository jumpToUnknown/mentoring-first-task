import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: 'users-list.component.html',
  imports: [
    UserCardComponent,
    NgForOf,
    AsyncPipe,
    MatButton,
  ]
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  onEditUser(user: IUser): void {
    this.usersService.editUser(user);
  }

  openDialog(user?: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          if (user) {
            this.usersService.editUser(result);
          } else {
            this.usersService.createUser(result);
          }
        }
      }
    )
  }
}
