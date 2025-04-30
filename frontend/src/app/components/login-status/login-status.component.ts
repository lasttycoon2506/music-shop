import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomUserClaims, UserClaims } from '@okta/okta-auth-js';
import { CheckOutService } from '../../services/check-out.service';
import { OktaService } from '../../services/okta.service';

@Component({
  selector: 'login-status',
  imports: [RouterLink],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  checkoutService = inject(CheckOutService);
  oktaService = inject(OktaService);
  usersName: string = '';

  ngOnInit(): void {
    this.oktaService.oktaAuthService.authState$.subscribe((result) => {
      this.oktaService.isAuthenticated.set(result.isAuthenticated!);
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    if (this.oktaService.isAuthenticated()) {
      this.oktaService.oktaAuth
        .getUser()
        .then(
          (result: UserClaims<CustomUserClaims>) =>
            (this.usersName = result.given_name!)
        );
    }
  }

  logout(): void {
    this.oktaService.oktaAuth.signOut();
  }
}
