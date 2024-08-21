import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {base_server_url} from '../utils/constants/application-constants';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private _user = signal<User | null>(null); // current sign in user
  public user = this._user.asReadonly();
  private _users = signal<User[] | null>(null); // list of users
  public users = this._users.asReadonly();

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
        this.getUserAvatar().subscribe((avatarData) => {
          this._user.update((curUser) => ({...curUser, avatar: `data:image/jpeg;base64,${avatarData.avatar}`} as User))
        })
      })
    );
  }

  /**
   * Get user's avatar
   * @param id the id of user, if specify then get user's avatar by id,
   * if not get current sign in user's avatar
   */
  public getUserAvatar(id?: string) {
    let url: string;
    if (id) {
      url = `${base_server_url}/users/${id}/avatar`
    } else {
      url = `${base_server_url}/users/customer-info/avatar`
    }
    let headers = new HttpHeaders();
    const accessToken = localStorage.getItem("accessToken");
    headers = headers.append('Authorization', 'Bearer ' + accessToken);
    return this.http.get<{ email: string, avatar: any }>(url, {observe: 'body', headers: headers});
  }

  /**
   * Get all users from backend
   */
  public getUsersData() {
    const url = `${base_server_url}/users`;
    let headers = new HttpHeaders();
    const accessToken = localStorage.getItem("accessToken");
    headers = headers.append('Authorization', 'Bearer ' + accessToken);
    return this.http.get<User[]>(url, {headers: headers}).pipe(
      tap((users) => {
        users.forEach((user) => {
          this.getUserAvatar(user.id).subscribe((avatarData) => {
            user.avatar = `data:image/jpeg;base64,${avatarData.avatar}`;
          });
        });
        this._users.set(users);
      })
    );
  }

  /**
   * Delete the data of current user
   */
  public deleteCurrentUserData() {
    this._user.update((curUser) => {
      return {} as User;
    })
  }
}
