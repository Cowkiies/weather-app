import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromUnixEpochToDate } from './from-unix-to-date.pipe';
import { FromIsoDateToTime } from './from-iso-date-to-time.pipe';

@NgModule({
  declarations: [
    FromUnixEpochToDate,
    FromIsoDateToTime
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FromUnixEpochToDate,
    FromIsoDateToTime
  ]
})
export class PipeModule { }
