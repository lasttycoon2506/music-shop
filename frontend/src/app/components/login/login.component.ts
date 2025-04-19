import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { OktaSignIn } from '@okta/okta-signin-widget';
import appConfig from '../../configs/app-config';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private oktaAuth: OktaAuth = inject(OKTA_AUTH);

  oktaSignIn: OktaSignIn = new OktaSignIn({
    el: '#okta-signin-widget',
    logo: 'assets/images/musicnote.png',
    baseUrl: appConfig.oidc.issuer,
    clientId: appConfig.oidc.clientId,
    redirectUri: appConfig.oidc.redirectUri,
    useClassicEngine: true,
    authParams: {
      pkce: true,
      issuer: appConfig.oidc.issuer,
      scopes: appConfig.oidc.scopes,
    },
  });

  ngOnInit(): void {
    this.oktaSignIn
      .showSignIn()
      .then(() => {
        this.oktaAuth.signInWithRedirect();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    if (this.oktaSignIn && this.oktaSignIn.remove) {
      this.oktaSignIn.remove();
    }
  }
}
