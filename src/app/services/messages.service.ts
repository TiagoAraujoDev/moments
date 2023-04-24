import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message: string = '';

  constructor() { }

  addMessage(message: string): void {
    this.message = message;

    setTimeout(() => {
      this.clearMessage();
    }, 4000);
  }

  clearMessage(): void {
    this.message = '';
  }
}
