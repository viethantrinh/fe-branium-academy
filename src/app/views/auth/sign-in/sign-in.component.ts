import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ba-sign-in',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
