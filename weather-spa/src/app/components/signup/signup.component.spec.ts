/* eslint-disable no-undef */
import { of } from 'rxjs';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  const mockFormService = jasmine.createSpyObj('mockFormService', ['buildSignInForm', 'buildLoginForm']);
  const mockUserService = jasmine.createSpyObj('mockUserService', ['createUser', 'login', 'logout']);
  const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['showToaster', 'showErrorToaster', 'showWarningToaster']);
  const mockForm = jasmine.createSpyObj('mockForm', ['reset']);

  beforeEach(() => {
    component = new SignupComponent(mockFormService, mockUserService, mockAlertService, mockRouter);
    component.form = mockForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error toaster if something goes wrong', () => {
    mockUserService.createUser.and.returnValue(of({}));
    component.onSubmit();
    expect(mockAlertService.showErrorToaster).toHaveBeenCalled();
  });

  it('should display toaster if signup is successful', () => {
    mockUserService.createUser.and.returnValue(of({
      username: 'user'
    }));
    component.onSubmit();
    expect(mockAlertService.showToaster).toHaveBeenCalled();
  });
});
