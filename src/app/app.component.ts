import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { passwordValidator } from './shared/password.validator';
//import Validators for appying validation to the forms
import { forbiddenNameValidator } from './shared/user-name.validator';
// importing the custom validator

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';
  registrationForm!: FormGroup;

  //get methods to access email and username
  get userName() {
    return this.registrationForm.get('userName');
  }
  get email() {
    return this.registrationForm.get('email');
  }

  //using Form arrays to store multiple altermate emails as per user dynamically
  //user can add alternate emails to this array
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }
  //import and inject registration form service
  constructor(
    private fb: FormBuilder
  ) //private _registrationServivce: RegistrationService
  {}
  //life-cycle hook for observable
  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            forbiddenNameValidator(/admin/),
          ],
        ],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validator: passwordValidator }
    );
    //using observable to subscribe to checkbox and see value chnage and set validator on box checked
    //important properties and methods are:
    //valueChanges : checks if value changes in the associated field
    //setValidators() : sets validation to the associated field
    //ClearValidators() : clears validation on associated field
    //updateValueAndValidity() : updates value and validity on the field
    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }
  // creating communication between model and view by injrcting instances to the constuctor
  // creating form control instances
  /*
  registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
    }),
  });
  */
  //alternative to instantiating from group and from control form builder service can be used

  /*
  registrationForm = this.fb.group(
    {
      //Simple validation on username field - visual feedback provided in HTML file
      //To specify more than one validation specify array of validations in the second field
      //Adding minlength validator to username
      //Pattern can be mentioned in the parameter of the custom validator function
      //cross field validator added in the form group and not form control
      userName: [
        'Amal',
        [
          Validators.required,
          Validators.minLength(4),
          forbiddenNameValidator(/admin/),
        ],
      ],Angular Forms Tutorial • 25 / 27
IN
9+

      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: ['calicut'],
        state: ['kerala'],
        postalCode: ['IND673572'],
      }),
    },
    { validator: passwordValidator }
  );
  */
  //managing from values from component class in reactive forms
  //function to programatically load dummy data to the form
  /*
  loadApiData() {
    //patchValue can be used in place of setvalue if we dont have to set value in all the fields
  
    this.registrationForm.setValue({
      userName: 'Amal',
      password: 'abc123',
      confirmPassword: 'abc123',
      address: {
        city: 'calicut',
        state: 'kerala',
        postalCode: 'IND673572',
      },
    });
    */
  /*
  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationServivce.register(this.registrationForm.value).subscribe(
      (response) => console.log('Success!', response),
      (error) => console.log('Error!', error)
    );
  }
  */
}
