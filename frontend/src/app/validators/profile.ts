import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function billingAddressValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const firstName = group.get('billingFirstName')?.value;
    const lastName = group.get('billingLastName')?.value;
    const street = group.get('billingStreet')?.value;
    const city = group.get('billingCity')?.value;
    const state = group.get('billingState')?.value;
    const zip = group.get('billingZip')?.value;

    const fields = { firstName, lastName, street, city, state, zip };
    const anyFieldFilled = Object.values(fields).some(
      (field) => field && field.trim() !== ''
    );

    if (anyFieldFilled) {
      const errors: ValidationErrors = {};
      Object.entries(fields).forEach(([key, value]) => {
        if (!value || value.trim() === '') {
          errors[key] = `${key} is required`;
        }
      });
      return Object.keys(errors).length > 0 ? errors : null;
    }

    return null;
  };
}
