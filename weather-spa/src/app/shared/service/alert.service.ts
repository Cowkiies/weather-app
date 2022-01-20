import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor (private messageService: MessageService) {}

  public showToaster (message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 4500 });
  }

  public showErrorToaster (message: string = 'Sorry, something went wrong.'): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 4500 });
  }

  public showWarningToaster (message: string = 'Sorry, something went wrong.'): void {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message, life: 4500 });
  }
}
