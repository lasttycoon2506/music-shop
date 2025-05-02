import { Component } from '@angular/core';
import { STATES_ABBREVIATIONS } from '../../constants/states.constants';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  STATES_ABBREVIATIONS = STATES_ABBREVIATIONS;
}
