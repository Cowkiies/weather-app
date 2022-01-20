import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { FormService } from 'src/app/shared/service/form.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor (
    private formService: FormService,
    private userService: UserService
  ) {
    this.form = this.formService.buildSignInForm();
  }

  ngOnInit (): void {
  }

  public onSubmit () {
    this.userService.createUser(this.form.value as User).subscribe(result => {
      console.log(result);
    });
  }
}
