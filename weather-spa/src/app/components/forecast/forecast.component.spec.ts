/* eslint-disable no-undef */
import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;

  beforeEach(() => {
    component = new ForecastComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the closest wind degree when a number is provided', () => {
    const windDeg = component.closestWindDeg(250);
    expect(windDeg).toEqual(248);
  });

  it('should return a beaufort indice when wind speed in km/h is given', () => {
    const beaufortInd = component.findBeaufortWindForce(25.2);
    expect(beaufortInd).toEqual(4);
  });
});
