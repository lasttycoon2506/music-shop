import { inject, Injectable, signal } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import appConfig from '../configs/app-config';

@Injectable({
  providedIn: 'root',
})
export class OktaService {
  oktaAuth: OktaAuth = inject(OKTA_AUTH);
  oktaAuthService = inject(OktaAuthStateService);
  isAuthenticated = signal<boolean>(false);

  async createUser(user: any) {
    // try {
    //   const transaction = this.oktaAuth.idx.register(user);
    //   console.log(transaction);
    //   return transaction;
    // } catch (error: any) {
    //   console.error(error);
    //   throw error;
    // }
    const resp = await fetch(`${appConfig.oidc.issuer}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.oktaAuth.token}`,
      },
      body: JSON.stringify({
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          login: user.email,
        },
        credentials: {
          password: { value: user.password },
        },
      }),
    });
    const data = await resp.json();
    console.log(data);
  }
}
