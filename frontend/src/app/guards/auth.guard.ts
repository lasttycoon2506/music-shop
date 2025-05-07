import { CanActivateFn } from '@angular/router';
import { OktaService } from '../services/okta.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const oktaService: OktaService = inject(OktaService);

  return oktaService.isAuthenticated();
};
