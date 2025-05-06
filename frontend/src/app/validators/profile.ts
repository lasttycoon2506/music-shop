import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
