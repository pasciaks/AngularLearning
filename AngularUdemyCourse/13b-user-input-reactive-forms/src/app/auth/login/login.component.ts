import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.indexOf('?') === -1) {
    return { mustContainQuestionMark: true }; // not valid
  }
  return null; // is valid
}
function emailIsUnique(control: AbstractControl) {
  // NOTE: ADD async/await ? optional use subscribe and tap with debounceTime
  // const response = await fetch('https://api.example.com/email-check', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email: control.value }),
  // });

  if (control.value !== 'test@example.com') {
    return of(null); // valid if not test@example.com
  }

  return of({ emailIsNotUnique: true }); // not valid, test@example.com is already used
}

let initialEmailValue = localStorage.getItem('email') || '';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // let emailLoaded = localStorage.getItem('email') || '';
    // this.form.patchValue({ email: emailLoaded });

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          localStorage.setItem('email', value.email);
        },
      });

    this.destroyRef.onDestroy(() => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
  // Angular Reactive Forms

  get emailIsInvalid() {
    return (
      this.form.controls['email'].touched &&
      this.form.controls['email'].dirty &&
      this.form.controls['email'].invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls['password'].touched &&
      this.form.controls['password'].dirty &&
      this.form.controls['password'].invalid
    );
  }

  form: FormGroup = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        mustContainQuestionMark,
      ],
    }),
  });

  onSubmit() {
    console.log(this.form.value);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    // validating the form
    console.log('Validating the form...');
    console.log(enteredEmail, enteredPassword);
    if (this.form.invalid) {
      alert('Warning! You have invalid values in the form.');
      return;
    }
    // submitted
    console.log('Submitted!');
    console.log(enteredEmail, enteredPassword);
  }
}
