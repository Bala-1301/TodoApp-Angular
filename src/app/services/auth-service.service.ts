import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../constants';
import { Login } from '../login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthUser = {
    email: '',
    isLoggedIn: false,
  };

  constructor(private http: HttpClient, private router: Router) {}

  fetchUser(email: string) {
    return this.http.get(`${API_URL}/users/${email}`);
  }

  createUser(user: User) {
    return this.http.put(`${API_URL}/users/${user.email}`, user);
  }

  signIn(login: Login) {
    if (login.email && login.password) {
      this.fetchUser(login.email).subscribe((data) => {
        if (data) {
          let _user: any = data;
          if (_user.password === login.password) {
            this.user.email = login.email;
            this.user.isLoggedIn = true;
            this.router.navigate(['/todos']);
          }
        }
      });
    }
  }

  signUp(user: User) {
    this.createUser(user).subscribe((data) => {
      this.user.email = user.email;
      this.user.isLoggedIn = true;
      this.router.navigate(['/todos']);
    });
  }
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  isLoggedIn: boolean;
}
