import { Component, inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { CustomUserClaims, UserClaims } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  imports: [],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  usersName: string = '';
  private oktaAuthService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth
        .getUser()
        .then(
          (result: UserClaims<CustomUserClaims>) =>
            (this.usersName = result.name!)
        );
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
