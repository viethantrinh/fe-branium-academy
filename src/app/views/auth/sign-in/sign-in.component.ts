import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserSI} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'ba-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    signInStatus: new FormControl(false)
  });


  get passwordValidation() {
    return this.signInForm.controls.password.invalid
      && this.signInForm.controls.password.touched;
  };

  get emailValidation() {
    return this.signInForm.controls.email.invalid
      && this.signInForm.controls.email.touched;
  }

  /**
   * submit form and sign in
   * if sign in successful, redirect user to homepage
   */
  onSignIn() {
    const signInData: UserSI = {
      email: this.signInForm.controls.email.value ?? '',
      password: this.signInForm.controls.password.value ?? ''
    };

    this.authService.signIn(signInData).subscribe({
      complete: () => {
        this.userService.getUserData().subscribe({
          next: () => {
            this.userService.getUserAvatar().subscribe((data) => {
              this.userService.updateUserAvatar(data);
              this.router.navigate(['/home'], {
                replaceUrl: true
              })
            });
          }
        });
      }
    })
  }
}
