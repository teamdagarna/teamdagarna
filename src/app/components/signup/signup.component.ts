import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isModalActive: boolean = false;
  // detailForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    // First Step

    this.signupForm = this.fb.group({
      'liuid': ['', [
        Validators.pattern('[A-Za-z]{5}[0-9]{3}$'),
        Validators.required
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'firstname': ['', [
        Validators.required
        ]
      ],
      'lastname': ['', [
        Validators.required
        ]
      ],
      'gdpr': ['', [
        Validators.required
        ]
      ],
    });

    // Second Step
    // this.detailForm = this.fb.group({
    //   'catchPhrase': ['', [ Validators.required ] ]
    // });
  }

  toggleModal() {
      this.isModalActive = !this.isModalActive;
  }

  // Using getters will make your code look pretty
  get liuid() { return this.signupForm.get('liuid') }
  get password() { return this.signupForm.get('password') }
  get firstname() { return this.signupForm.get('firstname') }
  get lastname() { return this.signupForm.get('lastname') }
  get gdpr() { return this.signupForm.get('lastname') }

  // get catchPhrase() { return this.detailForm.get('catchPhrase') }

  signup(data) {
   this.auth.emailSignUp(data).then((res) => {
         this.router.navigate(['']);
         // this.auth.createProfile(data);
      }).catch((error) => {

        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   if (errorCode == 'auth/email-already-in-use') {
        //   this.error = errorMessage;
        // } else if (errorCode == 'auth/invalid-email') {
        //   this.error = 'Not a valid e-mail';
        // } else if (errorCode == 'auth/operation-not-allowed') {
        //   this.error = 'Operation not allowed';
        // } else if (errorCode == 'auth/weak-password') {
        //   this.error = 'Weak password. Try again.';
        // } else {
        //   this.error = error.message;
        // }
      });
  }

  // Step 2
  // setCatchPhrase(user) {
  //   return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value })
  // }


}
