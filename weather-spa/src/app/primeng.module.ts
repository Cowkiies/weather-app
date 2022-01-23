import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    PanelModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MenubarModule,
    TabViewModule,
    AutoCompleteModule,
    ProgressSpinnerModule
  ]
})
export class PrimengModule { }
