import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {base_server_url} from '../utils/constants/application-constants';
import {tap} from 'rxjs';
import {UserSI} from '../models/user.model';
import {UserService} from './user.service';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);

  /**
   * Send request to backend to authenticate user details
   * If user is authenticated, store access token to localstorage
   * @param signInData user details from form
   */
  public signIn(signInData: UserSI) {
    const signInUrl = base_server_url + "/auth/sign-in";
    return this.http
      .post<{ accessToken: string, authenticated: boolean }>(signInUrl, signInData, {observe: 'response'})
      .pipe(
        tap(({body}) => {
          if (body) {
            localStorage.setItem("accessToken", body.accessToken);
          }
        })
      )
  }

  /**
   * Sign current user out of the application
   */
  public signOut() {
    // delete all data of current sign in user
    this.userService.deleteCurrentUserData();

    // send request to backend to logout
    const url = `${base_server_url}/auth/sign-out`;
    const signOutReq = {
      accessToken: localStorage.getItem('accessToken')
    };
    this.http.post(url, signOutReq).subscribe((data) =>
      console.log(data));

    // remove the token in local storage
    localStorage.removeItem('accessToken');
  }
}
