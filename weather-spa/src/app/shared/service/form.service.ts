import { Injectable } from '@angular/core';
import { RegexPattern } from '../validators/regex';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../validators/match-other.validator';

@Injectable({ providedIn: 'root' })

export class FormService {
  constructor (
        private formBuilder: FormBuilder
  ) {}

  buildSignInForm (): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(RegexPattern.password)]],
      repeatPassword: ['', [Validators.required, matchOtherValidator('password')]],
      email: ['', [Validators.required, Validators.pattern(RegexPattern.email)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  buildLoginForm (): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
