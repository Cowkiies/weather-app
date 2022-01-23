import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FormService } from 'src/app/shared/service/form.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private subscriptions: Subscription;

  constructor (
    private formService: FormService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.form = this.formService.buildSignInForm();
    this.subscriptions = new Subscription();
  }

  ngOnInit (): void {
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

  get emailControl (): FormControl {
    return this.form.get('email') as FormControl;
  }

  public onSubmit () {
    this.subscriptions.add(
      this.userService.createUser(this.form.value as User).subscribe(result => {
        if (Object.keys(result).length > 0) {
          this.alertService.showToaster('Successful signup');
          this.form.reset();
          this.subscriptions.add(timer(3000).subscribe(() => {
            this.router.navigate(['/login']);
          }));
        } else {
          this.alertService.showErrorToaster();
        }
      })
    );
  }
}
