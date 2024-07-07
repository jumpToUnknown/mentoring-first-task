import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from "../../models/user";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({required: true}) user: IUser;
  @Output() deleteUserEvent = new EventEmitter<number>();
  @Output() editUserEvent = new EventEmitter<IUser>();

  onDeleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

  onEditeUser() {
    this.editUserEvent.emit(this.user);
  }
}
