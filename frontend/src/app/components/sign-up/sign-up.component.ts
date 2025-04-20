import { Component, inject } from '@angular/core';
import { OktaService } from '../../services/okta.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private oktaService = inject(OktaService);
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.userForm.value);
    // this.oktaService.createUser(this.user);
  }
}
