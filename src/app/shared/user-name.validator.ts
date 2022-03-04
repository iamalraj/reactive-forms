// custom valaidator
// custom validator is a function that does the validation

import { AbstractControl, ValidatorFn } from '@angular/forms';

//Accepts one parameter fromcontrol and type of contol is abstract contol
//Validator function return an object with key of type string and value of type any if failed and null if passed

/*
export function forbiddenNameValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  //is forbidden if username contains string admin
  const forbidden = /admin/.test(control.value);
  //if forbidden return frobidden name error and value that was passed else return null
  return forbidden ? { forbiddenName: { value: control.value } } : null;
}
// to use validation export it in app component
*/

//drawback of the current validator function is it can only accept one parameter that is from control
//to overcome this issue we can use the below method

//create a factory function that accepts a string as the parameter and retuns the validator function
//in this method the pattern should be specified as parameter in form control
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
