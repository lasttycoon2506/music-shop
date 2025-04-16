import { Component, inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import {
  OktaSignIn,
  RenderError,
  RenderResult,
} from '@okta/okta-signin-widget';
import appConfig from '../../configs/app-config';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private oktaAuth: OktaAuth = inject(OKTA_AUTH);

  oktaSignIn: OktaSignIn = new OktaSignIn({
    logo: 'assets/images/musicnote.png',
    baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
    clientId: appConfig.oidc.clientId,
    redirectUri: appConfig.oidc.redirectUri,
    authParams: {
      pkce: true,
      issuer: appConfig.oidc.issuer,
      scopes: appConfig.oidc.scopes,
    },
  });

  ngOnInit(): void {
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl(
      { el: '#okta-signin-widget' },
      (res: RenderResult) => {
        if (res.status === 'SUCCESS') this.oktaAuth.signInWithRedirect();
      },
      (error: RenderError) => {
        throw error;
      }
    );
  }
}
