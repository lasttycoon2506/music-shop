import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';
import { OktaService } from '../../services/okta.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'login-status',
  imports: [RouterLink],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  private customerService: CustomerService = inject(CustomerService);
  private router: Router = inject(Router);
  checkoutService: CheckOutService = inject(CheckOutService);
  oktaService: OktaService = inject(OktaService);

  ngOnInit(): void {
    this.oktaService.oktaAuthService.authState$.subscribe((result) => {
      this.oktaService.isAuthenticated.set(result.isAuthenticated!);
      if (result.isAuthenticated) {
        this.oktaService.oktaAuth.getUser().then((result) => {
          this.oktaService.currentUser.set({
            firstName: result.given_name!,
            lastName: result.family_name!,
            email: result.email!,
          });
          this.customerService.getCustomer(result.email!);
        });
      }
    });
  }

  logout(): void {
    this.oktaService.oktaAuth.signOut();
    this.oktaService.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }
}
