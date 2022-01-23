import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.sass']
})
export class ForecastComponent implements OnInit {
  @Input() public data: Weather | undefined;
  private windIconDeg: number[];
  private beaufortIntervals: number[][];

  constructor () {
    this.windIconDeg = [0, 23, 45, 68, 90, 113, 135, 158, 180,
      203, 225, 248, 270, 293, 313, 336, 360];
    this.beaufortIntervals = [
      [0, 1],
      [1, 5],
      [5, 11],
      [11, 20],
      [20, 28],
      [28, 38],
      [38, 50],
      [50, 61],
      [61, 74],
      [74, 88],
      [88, 102],
      [102, 118],
      [118, 999]
    ];
  }

  ngOnInit (): void {
  }

  public isObject (variable: any): boolean {
    return Object.keys(variable).length > 0;
  }

  public closestWindDeg (num: number = 0): number {
    let current = this.windIconDeg[0];
    this.windIconDeg.forEach((deg: number) => {
      if (Math.abs(num - deg) < Math.abs(num - current)) {
        current = deg;
      }
    });
    current = current === 360 ? 0 : current;
    return current;
  }

  public findBeaufortWindForce (force: number = 0): number {
    for (let i = 0; i < this.beaufortIntervals.length; i++) {
      const interval = this.beaufortIntervals[i];
      if (interval[0] <= force && force < interval[1]) {
        return i;
      }
    }
    return 0;
  }

  public isNan (value: any): boolean {
    return isNaN(value);
  }
}
