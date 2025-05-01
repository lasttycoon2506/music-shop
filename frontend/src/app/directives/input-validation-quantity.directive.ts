import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appInputValidationQuantity]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputValidationQuantityDirective,
      multi: true,
    },
  ],
})
export class InputValidationQuantityDirective implements Validator {
  forbiddenName = input<string>('', { alias: 'appInputValidationQuantity' });
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName
      ? forbiddenNameValidator(new RegExp(this.forbiddenName(), 'i'))(control)
      : null;
  }
}

/** An actor's name can't match the given regular expression */
function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
