import { Component, inject } from '@angular/core';
import { STATES_ABBREVIATIONS } from '../../constants/states.constants';
import { OktaService } from '../../services/okta.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  oktaService = inject(OktaService);
  customerService = inject(CustomerService);
  billingShippingSame: boolean = false;
  STATES_ABBREVIATIONS = STATES_ABBREVIATIONS;

  billingShippingAddrSame(event: Event) {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.billingShippingSame = true;
    } else {
      this.billingShippingSame = false;
    }
  }
}
