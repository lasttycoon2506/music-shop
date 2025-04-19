import { inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root',
})
export class OktaService {
  private oktaAuth: OktaAuth = inject(OKTA_AUTH);

  createUser(user: any) {
    try {
      const transaction = this.oktaAuth.idx.register(user);
      return transaction;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
