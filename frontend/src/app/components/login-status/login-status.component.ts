import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { CustomUserClaims, UserClaims } from '@okta/okta-auth-js';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'login-status',
  imports: [RouterLink],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  private oktaAuthService = inject(OktaAuthStateService);
  checkoutService = inject(CheckOutService);
  private oktaAuth = inject(OKTA_AUTH);
  isAuthenticated: boolean = false;
  usersName: string = '';

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    if (this.isAuthenticated) {
      this.oktaAuth
        .getUser()
        .then(
          (result: UserClaims<CustomUserClaims>) =>
            (this.usersName = result.given_name!)
        );
    }
  }

  logout(): void {
    this.oktaAuth.signOut();
  }
}
