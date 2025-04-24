import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  order = signal<>;
}
