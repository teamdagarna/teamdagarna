import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  // detailForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    // First Step

    this.loginForm = this.fb.group({
      'liuid': ['', [
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
    });

    // Second Step
    // this.detailForm = this.fb.group({
    //   'catchPhrase': ['', [ Validators.required ] ]
    // });
  }

  // Using getters will make your code look pretty
 get liuid() { return this.loginForm.get('liuid') }
 get password() { return this.loginForm.get('password') }

 // get catchPhrase() { return this.detailForm.get('catchPhrase') }

 login(data) {
   var liumail = data.liuid + '@teststudent.se';
   console.log(liumail)
   this.auth.emailLogin(liumail, data.password).then((res) => {
         this.router.navigate(['']);
      }).catch((error) => {
        console.log(error);

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
