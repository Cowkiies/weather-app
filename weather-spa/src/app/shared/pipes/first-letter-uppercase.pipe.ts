import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstCharToUpper' })
export class FirstCharToUpper implements PipeTransform {
  transform (value: string | undefined): string {
    return value ? value[0].toUpperCase() + value.substring(1) : '';
  }
}
