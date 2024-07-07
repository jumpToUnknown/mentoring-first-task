import { inject, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
