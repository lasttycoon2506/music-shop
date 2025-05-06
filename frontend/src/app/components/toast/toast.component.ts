import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit {
  alertPlaceholder: HTMLElement | null = null;
  alertTrigger: HTMLElement | null = null;

  ngOnInit() {
    this.alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    this.alertTrigger = document.getElementById('liveAlertBtn');

    if (this.alertTrigger) {
      this.alertTrigger.addEventListener('click', () => {
        this.appendAlert('Nice, you triggered this alert message!', 'success');
      });
    }
  }

  appendAlert(message: any, type: any) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');
    this.alertPlaceholder!.append(wrapper);
  }
}
