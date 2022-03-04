//custom validator for cross validation of password and confirm password

import { AbstractControl } from '@angular/forms';

//takes in form control as parameter and returns an object if validation fails and nul if validation passes
//control passed in the parameter represents form-group registeration form to get a hold of password and confirm password
export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  //Do not return any error until both values are entered in both the fields
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  //if password and confirm password are both not blank and both match return null else return error mismatch as true
  return password && confirmPassword && password.value != confirmPassword.value
    ? { mismatch: true }
    : null;
}
