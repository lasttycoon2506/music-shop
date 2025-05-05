import { Component, inject } from '@angular/core';
import { STATES_ABBREVIATIONS } from '../../constants/states.constants';
import { OktaService } from '../../services/okta.service';
import { CustomerService } from '../../services/customer.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  oktaService = inject(OktaService);
  customerService = inject(CustomerService);
  billingShippingSame: boolean = false;
  STATES_ABBREVIATIONS = STATES_ABBREVIATIONS;
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(
      this.customerService.currentCustomer()?.billingAddress.firstName
    ),
    lastName: new FormControl(
      this.customerService.currentCustomer()?.billingAddress.lastName
    ),
    street: new FormControl(
      this.customerService.currentCustomer()?.billingAddress.street
    ),
    city: new FormControl(
      this.customerService.currentCustomer()?.billingAddress.city
    ),
    state: new FormControl(
      this.customerService.currentCustomer()?.billingAddress.state
    ),
    zip: new FormControl(
      this.customerService.currentCustomer()?.billingAddress.zip,
      [Validators.minLength(5), Validators.maxLength(5)]
    ),
  });

  billingShippingAddrSame(event: Event) {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.billingShippingSame = true;
    } else {
      this.billingShippingSame = false;
    }
  }

  editCustomer() {
    console.log('working');
  }
}
