import { Component } from '@angular/core';
import { LoginStatusComponent } from '../login-status/login-status.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [LoginStatusComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {}
