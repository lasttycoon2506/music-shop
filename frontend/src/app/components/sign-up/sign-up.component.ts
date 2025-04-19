import { Component, inject } from '@angular/core';
import { OktaService } from '../../services/okta.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private oktaService = inject(OktaService);
  user: any;

  onSubmit() {
    console.log(this.user);
    // this.oktaService.createUser(this.user);
  }
}
