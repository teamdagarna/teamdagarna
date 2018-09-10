import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companysignin',
  templateUrl: './companysignin.component.html',
  styleUrls: ['./companysignin.component.scss']
})
export class CompanysigninComponent implements OnInit {

  companyLoginForm: FormGroup;
  errorMessage: string;

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.companyLoginForm = this.fb.group({
      'mail': ['', [
        Validators.required
        ]
      ],
      'password': ['', [
        Validators.required
        ]
      ],
    });
  }

  login(data) {
    var mail = data.mail + '@teamdagarna.com'
    this.auth.emailLogin(mail, data.password).then((res) => {
          this.router.navigate(['companyguest']);
       }).catch((error) => {
         var errorCode = error.code;
         if (errorCode === 'auth/wrong-password') {
           this.errorMessage = 'Verkar inte som att du matat in rätt användarnamn eller lösenord. Testa igen.';
         } else if (errorCode === 'auth/invalid-email') {
           this.errorMessage = 'Verkar inte som att du matat in rätt användarnamn eller lösenord. Testa igen.';
         } else if (errorCode === 'auth/user-not-found') {
           this.errorMessage = 'Verkar inte som att du matat in rätt användarnamn eller lösenord. Testa igen.';
         } else {
           this.errorMessage = 'Något gick fel. Testa igen.';
         }
       });
  }

}
