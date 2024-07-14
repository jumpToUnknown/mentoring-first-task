import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user';
import { UsersApiService } from './users-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private storage = inject(LocalStorageService);
  private usersSubject$ = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

  constructor(private usersApiService: UsersApiService) {
    this.storage.getUsers();
  }

  public loadUsers() {
    const localUsers = this.storage.getUsers();
    if (localUsers.length > 0) {
      this.usersSubject$.next(localUsers);
    } else {
      this.usersApiService.getUsers().subscribe((data: IUser[]) => {
        this.usersSubject$.next(data);
        this.storage.saveUsers(data);
      });
    }
  }

  deleteUser(id: number): void {
    const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id);
    this.usersSubject$.next(updatedUsers);
    this.storage.saveUsers(updatedUsers);
  }

  createUser(newUser: IUser): void {
    const updatedUsers = [...this.usersSubject$.value, newUser];
    this.usersSubject$.next(updatedUsers);
    this.storage.saveUsers(updatedUsers);
  }

  editUser(updatedUser: IUser): void {
    const updatedUsers = this.usersSubject$.value.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.usersSubject$.next(updatedUsers);
    this.storage.saveUsers(updatedUsers);
  }

  getMaxUserId(): number {
    const users = this.storage.getUsers();
    if (users && users.length > 0) {
      return Math.max(...users.map(user => user.id));
    }
    return 0;
  }
}
