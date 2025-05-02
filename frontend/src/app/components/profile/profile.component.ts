import { Component, inject } from '@angular/core';
import { STATES_ABBREVIATIONS } from '../../constants/states.constants';
import { OktaService } from '../../services/okta.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  oktaService = inject(OktaService);
  STATES_ABBREVIATIONS = STATES_ABBREVIATIONS;
}
