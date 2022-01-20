import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    PanelModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ]
})
export class PrimengModule { }
