import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { NgbToast, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService, ToastType } from '@app/services/toast.service';

export const ToastTypeClasses: Record<ToastType, string> = {
  [ToastType.Message]: "bg-success text-white",
  [ToastType.Warning]: "bg-warning text-white",
  [ToastType.Error]: "bg-danger text-white",
};

@Component({
  selector: 'app-toast',
  imports: [NgbToast],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  constructor(public toastService: ToastService) {}

  getToastClass(type: ToastType): string {
    return ToastTypeClasses[type];
  }
}
