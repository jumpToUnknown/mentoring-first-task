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
    this.loadUsers();
  }

  private getUsersFromLocalStorage(): IUser[] | null {
    const raw = this.storage.getItem();
    return raw ? JSON.parse(raw) : null;
  }

  private saveUsersToLocalStorage(users: IUser[]): void {
    this.storage.setItem(JSON.stringify(users));
  }

  private fetchUsersFromApi(): void {
    this.usersApiService.getUsers().subscribe((data: IUser[]) => {
      this.usersSubject$.next(data);
      this.saveUsersToLocalStorage(data);
    });
  }

  loadUsers(): void {
    const users = this.getUsersFromLocalStorage();
    if (users && users.length > 0) {
      this.usersSubject$.next(users);
    } else {
      this.fetchUsersFromApi();
    }
  }

  deleteUser(id: number): void {
    const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id);
    this.usersSubject$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers);
  }

  createUser(newUser: IUser): void {
    const updatedUsers = [...this.usersSubject$.value, newUser];
    this.usersSubject$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers);
  }

  editUser(updatedUser: IUser): void {
    const updatedUsers = this.usersSubject$.value.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.usersSubject$.next(updatedUsers);
    this.saveUsersToLocalStorage(updatedUsers);
  }

  getMaxUserId(): number {
    const users = this.getUsersFromLocalStorage();
    if (users && users.length > 0) {
      return Math.max(...users.map(user => user.id));
    }
    return 0;
  }
}
