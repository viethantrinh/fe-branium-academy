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
    // TODO: Implement interceptor to intercept the req/res
    let headers = new HttpHeaders();
    const accessToken = localStorage.getItem("accessToken");
    headers = headers.append('Authorization', 'Bearer ' + accessToken);
    return this.http.get<User>(url, {headers: headers}).pipe(
      tap((userData) => {
        this._user.set({...userData, authenticated: true})
      })
    );
  }

  /**
   * Get user's avatar which signed in
   */
  public getUserAvatar() {
    const url = `${base_server_url}/users/customer-info/avatar`;
    let headers = new HttpHeaders();
    const accessToken = localStorage.getItem("accessToken");
    headers = headers.append('Authorization', 'Bearer ' + accessToken);
    return this.http.get<{ email: string, avatar: any }>(url, {observe: 'body', headers: headers});
  }

  /**
   * Delete the data of current user
   */
  public deleteCurrentUserData() {
    this._user.update((curUser) => {
      return {} as User;
    })
  }

  public updateUserAvatar(data: {email: string, avatar: any}) {
    this._user.update((curUser) => ({...curUser, avatar: `data:image/jpeg;base64,${data.avatar}`} as User))
  }
}
