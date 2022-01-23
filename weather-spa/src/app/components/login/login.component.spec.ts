/* eslint-disable no-undef */
import { of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  const mockFormService = jasmine.createSpyObj('mockFormService', ['buildSignInForm', 'buildLoginForm']);
  const mockUserService = jasmine.createSpyObj('mockUserService', ['createUser', 'login', 'logout']);
  const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['showToaster', 'showErrorToaster', 'showWarningToaster']);
  const mockForm = jasmine.createSpyObj('mockForm', ['get']);

  beforeEach(() => {
    component = new LoginComponent(mockFormService, mockUserService, mockRouter, mockAlertService);
    mockForm.get.and.returnValue = '';
    component.form = mockForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a toaster when login fails', () => {
    mockUserService.login.and.returnValue(of({}));
    component.onSubmit();
    expect(mockAlertService.showErrorToaster).toHaveBeenCalled();
  });

  it('should navigate to the dashboard when login is successful', () => {
    mockUserService.login.and.returnValue(of({
      username: 'username',
      token: 'randomjwttoken'
    }));
    component.onSubmit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
