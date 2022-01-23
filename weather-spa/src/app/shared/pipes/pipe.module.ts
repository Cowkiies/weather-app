import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromUnixEpochToDate } from './from-unix-to-date.pipe';
import { FromIsoDateToTime } from './from-iso-date-to-time.pipe';
import { FirstCharToUpper } from './first-letter-uppercase.pipe';

@NgModule({
  declarations: [
    FromUnixEpochToDate,
    FromIsoDateToTime,
    FirstCharToUpper
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FromUnixEpochToDate,
    FromIsoDateToTime,
    FirstCharToUpper
  ]
})
export class PipeModule { }
