import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function billingAddressValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const billingFirstName: string = group.get('billingFirstName')?.value;
    const billingLastName: string = group.get('billingLastName')?.value;
    const billingStreet: string = group.get('billingStreet')?.value;
    const billingCity: string = group.get('billingCity')?.value;
    const billingState: string = group.get('billingState')?.value;
    const billingZip: string = group.get('billingZip')?.value;

    const fields = {
      billingFirstName,
      billingLastName,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
    };

    const anyFieldFilled: boolean = Object.values(fields).some(
      (field) => field && field.trim() !== ''
    );

    if (anyFieldFilled) {
      const errors: ValidationErrors = {};
      Object.entries(fields).forEach(([key, value]) => {
        if (!value || value.trim() === '') {
          errors[key] = 'Missing!';
        }
      });
      return Object.keys(errors).length > 0 ? errors : null;
    }

    return null;
  };
}

export function shippingAddressValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const shippingFirstName: string = group.get('shippingFirstName')?.value;
    const shippingLastName: string = group.get('shippingLastName')?.value;
    const shippingStreet: string = group.get('shippingStreet')?.value;
    const shippingCity: string = group.get('shippingCity')?.value;
    const shippingState: string = group.get('shippingState')?.value;
    const shippingZip: string = group.get('shippingZip')?.value;

    const fields = {
      shippingFirstName,
      shippingLastName,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
    };

    const anyFieldFilled: boolean = Object.values(fields).some(
      (field) => field && field.trim() !== ''
    );

    const valErrors: ValidationErrors = {};
    if (anyFieldFilled) {
      Object.entries(fields).forEach(([key, value]) => {
        if (!value || value.trim() === '') {
          valErrors[key] = 'Missing!';
        }
      });
      return Object.keys(valErrors).length > 0 ? valErrors : null;
    }
    return null;
  };
}
