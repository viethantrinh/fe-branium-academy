import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {base_server_url} from '../utils/constants/application-constants';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private _user = signal<User | null>(null);
  public user = this._user.asReadonly();

  /**
   * Get user data after sign in success
   * The request contain header with token to send to backend server
   * If user's data return back successful, set to _user signal
   */
  public getUserData() {
    const url = base_server_url + '/users/customer-info';
    let headers = new HttpHeaders();
    const accessToken = localStorage.getItem("accessToken");
    headers = headers.append('Authorization', 'Bearer ' + accessToken);
    return this.http.get<User>(url, {headers: headers}).pipe(
      tap((userData) => {
        this._user.set({...userData, authenticated: true})
      })
    );
  }

  public updateUserAuthenticatedStatus(authenticated: boolean) {
    this._user.update((oldUser) => {
      if (oldUser !== null) {
        return {...oldUser, authenticated: authenticated}
      }
      return oldUser;
    })
  }
}
