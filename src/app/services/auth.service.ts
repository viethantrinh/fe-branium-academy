import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {base_server_url} from '../utils/constants/application-constants';
import {tap} from 'rxjs';
import {UserSI} from '../models/user.model';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly http = inject(HttpClient);

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
}
