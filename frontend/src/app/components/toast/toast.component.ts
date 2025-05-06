import { Component } from '@angular/core';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-toast',
  imports: [],

  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toastTrigger = document.getElementById('liveToastBtn');
  toastLiveExample = document.getElementById('liveToast');

  if(toastTrigger: any) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(
      this.toastLiveExample
    );
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show();
    });
  }
}
