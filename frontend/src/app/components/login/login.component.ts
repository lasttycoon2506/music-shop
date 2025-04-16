import { Component, inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OctaSignIn, { OktaSignIn } from '@okta/okta-signin-widget';
import appConfig from '../../configs/app-config';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private okta: OktaAuth = inject(OKTA_AUTH);

  oktaSignIn = new OktaSignIn({
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
}
