import { Injectable, TemplateRef } from '@angular/core';

export enum ToastType {
  Message,
  Warning,
  Error
}

export interface Toast {
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	toasts: Toast[] = [];

  constructor() { }

	show(toast: Toast) {
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
  
  getToastClass(toastType: ToastType) {

  }
}
