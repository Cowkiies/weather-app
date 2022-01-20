import { AbstractControl } from '@angular/forms';

export function matchOtherValidator (otherControlName: string) {
  let otherControl: (AbstractControl | undefined);

  return function matchOtherValidate (control: AbstractControl): { matchOther: boolean} | null {
    if (!control.parent) {
      return null;
    }

    otherControl = (control.parent.get(otherControlName) || undefined);
    if (!otherControl) {
      return null;
    }

    otherControl.valueChanges.subscribe(() => control!.updateValueAndValidity());
    if (otherControl.value !== control.value) {
      return { matchOther: true };
    }
    return null;
  };
}
