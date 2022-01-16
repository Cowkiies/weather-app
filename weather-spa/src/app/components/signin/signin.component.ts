import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    this.form = this.formService.buildSigninForm();
  }

  ngOnInit (): void {
  }

  public onSubmit () {
    this.userService.createUser(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(result => {
      console.log(result);
    });
  }
}
