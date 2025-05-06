import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function billingAddressValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const billingFirstName = group.get('billingFirstName')?.value;
    const billingLastName = group.get('billingLastName')?.value;
    const billingStreet = group.get('billingStreet')?.value;
    const billingCity = group.get('billingCity')?.value;
    const billingState = group.get('billingState')?.value;
    const billingZip = group.get('billingZip')?.value;

    const fields = {
      billingFirstName,
      billingLastName,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
    };

    const anyFieldFilled = Object.values(fields).some(
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
    const shippingFirstName = group.get('shippingFirstName')?.value;
    const shippingLastName = group.get('shippingLastName')?.value;
    const shippingStreet = group.get('shippingStreet')?.value;
    const shippingCity = group.get('shippingCity')?.value;
    const shippingState = group.get('shippingState')?.value;
    const shippingZip = group.get('shippingZip')?.value;

    const fields = {
      shippingFirstName,
      shippingLastName,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
    };

    const anyFieldFilled = Object.values(fields).some(
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
