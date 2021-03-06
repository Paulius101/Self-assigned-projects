import { Injectable } from '@angular/core';
import {
  User
} from "../models/users";
import {
  HttpClient
} from "@angular/common/http";
import {
  Observable
} from "rxjs";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
private _token ? : string;

  constructor(private http: HttpClient, public router:Router) {
    this._token = window.sessionStorage.getItem("token") || undefined;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public setToken(token : string): void {
    this._token = token;
    if (token)
      window.sessionStorage.setItem("token", token);
      else
      window.sessionStorage.removeItem(token)
  }

  public get isLoggedIn(): boolean {
    return !!this._token;
  }

  public registerUser(user: User): Observable < Object > {
    return this.http.post(`${environment.baseRestUrl}/api/user/register`, user);
  }

  public login(user: User): Observable < LoginResponse > {
    return this.http.post < LoginResponse > (`${environment.baseRestUrl}/api/user/login`, user);
  }

  public logout():void {
  this.setToken('');
  this.router.navigate(['sign-in'])
}
}


export interface LoginResponse {
  token: string;
  msg: string;
}
 

