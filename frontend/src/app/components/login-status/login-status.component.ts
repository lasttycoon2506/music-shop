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

  ngOnInit(): void {
    this.oktaService.oktaAuthService.authState$.subscribe((result) => {
      this.oktaService.isAuthenticated.set(result.isAuthenticated!);
      if (result.isAuthenticated) {
        this.oktaService.oktaAuth.getUser().then((result) => {
          this.oktaService.user.set({
            firstName: result.given_name!,
            lastName: result.family_name!,
            email: result.email!,
          });
        });
      }
    });
  }

  logout(): void {
    this.oktaService.oktaAuth.signOut();
    this.oktaService.isAuthenticated.set(false);
  }
}
