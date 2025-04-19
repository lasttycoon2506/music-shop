import { Component, inject } from '@angular/core';
import { OktaService } from '../../services/okta.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private oktaService = inject(OktaService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  onSubmit() {
    // this.oktaService.createUser(this.user);
  }
}
