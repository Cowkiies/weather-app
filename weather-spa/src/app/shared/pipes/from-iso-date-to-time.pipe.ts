import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fromIsoDateToTime' })
export class FromIsoDateToTime implements PipeTransform {
  transform (value: string | undefined): string {
    return value ? value.split('T')[1].split('.')[0] : '';
  }
}
