import { Component } from '@angular/core';
import { LoginStatusComponent } from '../login-status/login-status.component';

@Component({
  selector: 'nav-bar',
  imports: [LoginStatusComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {}
