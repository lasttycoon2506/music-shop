import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OktaSignIn } from '@okta/okta-signin-widget';
import appConfig from '../../configs/app-config';
import { OktaService } from '../../services/okta.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private oktaService: OktaService = inject(OktaService);

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
        this.oktaService.oktaAuth.signInWithRedirect();
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
