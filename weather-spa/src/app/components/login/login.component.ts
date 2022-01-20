import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor (
    private formService: FormService,
    private userService: UserService
  ) {
    this.form = this.formService.buildLoginForm();
  }

  ngOnInit (): void {
  }

  public onSubmit () {
    this.userService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(result => {
      console.log(result);
    });
  }
}
