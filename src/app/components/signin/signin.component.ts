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
  errorMessage: string;
  loading: Boolean = false;
  // detailForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    // First Step

    this.loginForm = this.fb.group({
      'liuid': ['', [
        Validators.pattern('[A-Za-z]{4,5}[0-9]{3}$'),
        Validators.required
        ]
      ],
      'password': ['', [
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
   this.loading = true;
   var liumail = data.liuid + '@student.liu.se';
   console.log(liumail)
   this.auth.emailLogin(liumail, data.password).then((res) => {
         this.loading = false;
         this.router.navigate(['']);
         //Checks if request comes from the app. If user logs in the info in the navbar will change in the app.
         if (navigator.userAgent.indexOf('gonative') > -1) {
           var info = {userId: this.auth.getUserID(), userEmail: this.auth.getUserEmail()};
           var json = JSON.stringify(info);
           setTimeout(function() {
             window.location.href ='gonative://registration/send?customData=' + encodeURIComponent(json);
           }, 1200);
         }
      }).catch((error) => {
        this.loading = false;
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          this.errorMessage = 'Verkar inte som att du matat in rätt LiU-ID eller lösenord. Testa igen.';
        } else if (errorCode === 'auth/invalid-email') {
          this.errorMessage = 'Verkar inte som att du matat in rätt LiU-ID eller lösenord. Testa igen.';
        } else if (errorCode === 'auth/user-not-found') {
          this.errorMessage = 'Verkar inte som att du matat in rätt LiU-ID eller lösenord. Har du registrerat dig?';
        } else {
          this.errorMessage = 'Något gick fel. Testa igen.';
        }
      });
 }

 // Step 2
 // setCatchPhrase(user) {
 //   return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value })
 // }

}
