import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, UserForm} from '../models/user.model';
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

  public createUser(userCreate: UserForm, avatarFile: File | undefined | null) {
    const url = `${base_server_url}/users`;
    return this.http.post<User>(url, userCreate).pipe(
      tap((data) => { // update users state
        this._users.update((oldUsers) => {
          if (oldUsers) {
            if (avatarFile) {
              data.avatar = URL.createObjectURL(avatarFile);
              this.updateUserAvatar(data.id, avatarFile).subscribe()
            }
            return [...oldUsers, data]
          }
          return oldUsers;
        })
      }),
    );
  }

  public updateUser(userUpdate: UserForm, avatarFile: File | null | undefined, currentAvatar: string | null) {
    const url = `${base_server_url}/users/${userUpdate.id}`;
    return this.http.put<User>(url, userUpdate).pipe(
      tap((data) => { // update users state
        this._users.update((oldUsers) => {
          if (oldUsers) {
            if (avatarFile) {
              data.avatar = URL.createObjectURL(avatarFile);
              this.updateUserAvatar(data.id, avatarFile).subscribe()
            } else {
              data.avatar = currentAvatar;
            }
            let users = oldUsers.filter((u) => u.id !== data.id);
            users.push(data);
            return users;
          }
          return oldUsers;
        })
      }),
    );
  }

  /**
   * Get user data after sign in success
   * The request contain header with token to send to backend server
   * If user's data return back successful, set to _user signal
   */
  public getUserData() {
    const url = base_server_url + '/users/customer-info';
    return this.http.get<User>(url).pipe(
      tap((userData) => {
        this._user.set({...userData, authenticated: true})
        this.getUserAvatar().subscribe((avatarData) => {
          this._user.update((curUser) => ({...curUser, avatar: `data:image/jpeg;base64,${avatarData.avatar}`} as User))
        })
      })
    );
  }

  public updateUserAvatar(id: string, avatar: any) {
    const url = `${base_server_url}/users/${id}/avatar`;
    const formData = new FormData();
    formData.append('avatar', avatar);
    return this.http.put(url, formData);
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
    return this.http.get<{ email: string, avatar: any }>(url, {observe: 'body'});
  }

  /**
   * Get all users from backend
   */
  public getUsersData() {
    const url = `${base_server_url}/users`;
    return this.http.get<User[]>(url).pipe(
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
   * Delete the data of current user for logging out
   */
  public deleteCurrentUserData() {
    this._user.update((curUser) => {
      return {} as User;
    })
  }

  /**
   *
   */
  public deleteUser(id: string) {
    const url = `${base_server_url}/users/${id}`;
    return this.http.delete(url).pipe(
      tap(() => this._users.update((oldUsers) => {
        if (oldUsers) {
          return oldUsers.filter((user) => user.id !== id);
        }
        return oldUsers;
      }))
    );
  }

}
