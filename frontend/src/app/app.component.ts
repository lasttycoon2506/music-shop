import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarVerticalComponent } from './components/nav-bar-vertical/nav-bar-vertical.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, NavBarVerticalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
