import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  alertPlaceholder: HTMLElement | null = null;

  ngOnInit() {
    this.alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  }

  showAlert(message: string, type: string) {
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
