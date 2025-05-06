import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { STATES_ABBREVIATIONS } from '../../constants/states.constants';
import { OktaService } from '../../services/okta.service';
import { CustomerService } from '../../services/customer.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../models/customer';
import {
  billingAddressValidator,
  shippingAddressValidator,
} from '../../validators/profile';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  oktaService = inject(OktaService);
  customerService = inject(CustomerService);
  billingShippingSame: boolean = false;
  STATES_ABBREVIATIONS = STATES_ABBREVIATIONS;
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;
  profileForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl(
        this.oktaService.currentUser()!.firstName,
        Validators.required
      ),
      lastName: new FormControl(
        this.oktaService.currentUser()!.lastName,
        Validators.required
      ),
      email: new FormControl(this.oktaService.currentUser()!.email, [
        Validators.required,
        Validators.email,
      ]),
      billingFirstName: new FormControl(
        this.customerService.currentCustomer()?.billingAddress?.firstName ?? ''
      ),
      billingLastName: new FormControl(
        this.customerService.currentCustomer()?.billingAddress?.lastName ?? ''
      ),
      billingStreet: new FormControl(
        this.customerService.currentCustomer()?.billingAddress?.street ?? ''
      ),
      billingCity: new FormControl(
        this.customerService.currentCustomer()?.billingAddress?.city ?? ''
      ),
      billingState: new FormControl(
        this.customerService.currentCustomer()?.billingAddress?.state ?? ''
      ),
      billingZip: new FormControl(
        this.customerService.currentCustomer()?.billingAddress?.zip ?? '',
        [Validators.minLength(5), Validators.maxLength(5)]
      ),
      shippingFirstName: new FormControl(
        this.customerService.currentCustomer()?.shippingAddress?.firstName ?? ''
      ),
      shippingLastName: new FormControl(
        this.customerService.currentCustomer()?.shippingAddress?.lastName ?? ''
      ),
      shippingStreet: new FormControl(
        this.customerService.currentCustomer()?.shippingAddress?.street ?? ''
      ),
      shippingCity: new FormControl(
        this.customerService.currentCustomer()?.shippingAddress?.city ?? ''
      ),
      shippingState: new FormControl(
        this.customerService.currentCustomer()?.shippingAddress?.state ?? ''
      ),
      shippingZip: new FormControl(
        this.customerService.currentCustomer()?.shippingAddress?.zip ?? '',
        [Validators.minLength(5), Validators.maxLength(5)]
      ),
    },
    { validators: [billingAddressValidator(), shippingAddressValidator()] }
  );

  sameAddressToggle(event: Event) {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.billingShippingSame = true;
      this.profileForm.patchValue({
        shippingFirstName: this.profileForm.get('billingFirstName')?.value,
        shippingLastName: this.profileForm.get('billingLastName')?.value,
        shippingStreet: this.profileForm.get('billingStreet')?.value,
        shippingCity: this.profileForm.get('billingCity')?.value,
        shippingState: this.profileForm.get('billingState')?.value,
        shippingZip: this.profileForm.get('billingZip')?.value,
      });
    } else {
      this.billingShippingSame = false;
      this.profileForm.setValue({
        shippingFirstName:
          this.customerService.currentCustomer()?.shippingAddress?.firstName,
        shippingLastName:
          this.customerService.currentCustomer()?.shippingAddress?.lastName,
        shippingStreet:
          this.customerService.currentCustomer()?.shippingAddress?.street,
        shippingCity:
          this.customerService.currentCustomer()?.shippingAddress?.city,
        shippingState:
          this.customerService.currentCustomer()?.shippingAddress?.state,
        shippingZip:
          this.customerService.currentCustomer()?.shippingAddress?.zip,
      });
    }
  }

  editCustomer() {
    this.alertComponent.showAlert('Profile Edited!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const customer: Customer = {
      firstName: this.profileForm.get('firstName')!.value,
      lastName: this.profileForm.get('lastName')!.value,
      email: this.profileForm.get('email')!.value,
      billingAddress: {
        firstName: this.profileForm.get('billingFirstName')?.value,
        lastName: this.profileForm.get('billingLastName')?.value,
        street: this.profileForm.get('billingStreet')?.value,
        city: this.profileForm.get('billingCity')?.value,
        state: this.profileForm.get('billingState')?.value,
        zip: this.profileForm.get('billingZip')?.value,
      },
      shippingAddress: {
        firstName: this.profileForm.get('shippingFirstName')?.value,
        lastName: this.profileForm.get('shippingLastName')?.value,
        street: this.profileForm.get('shippingStreet')?.value,
        city: this.profileForm.get('shippingCity')?.value,
        state: this.profileForm.get('shippingState')?.value,
        zip: this.profileForm.get('shippingZip')?.value,
      },
    };
    this.customerService.editCustomer(customer);
  }
}
