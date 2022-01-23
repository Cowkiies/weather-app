import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fromUnixEpochToDate' })
export class FromUnixEpochToDate implements PipeTransform {
  transform (value: number | undefined): string | undefined {
    return value ? new Date(value * 1000).toISOString() : `${value}`;
  }
}
