import { Injectable } from '@angular/core';
import { IUser } from  '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public readonly key = 'users';
  public getUsers(): IUser[] {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  public saveUsers(users: IUser[]) {
    localStorage.setItem(this.key, JSON.stringify(users));
  }
}
