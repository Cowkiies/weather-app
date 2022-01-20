import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FormService } from 'src/app/shared/service/form.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private subscriptions: Subscription;

  constructor (
    private formService: FormService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.form = this.formService.buildLoginForm();
    this.subscriptions = new Subscription();
  }

  ngOnInit (): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

  public onSubmit () {
    this.subscriptions.add(
      this.userService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(result => {
        if (Object.keys(result).length === 0) {
          this.alertService.showErrorToaster('Incorrect credentials');
        } else {
          this.router.navigate(['/']);
        }
      }));
  }
}
