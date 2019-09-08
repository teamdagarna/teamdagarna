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
  errorMessage: string;
  loading: boolean = false;
  // detailForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    // First Step

    this.signupForm = this.fb.group({
      'liuid': ['', [
        Validators.pattern('[A-Za-z]{4,5}[0-9]{3}$'),
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
      'program': ['', [
        Validators.required
        ]
      ],
      'year': ['', [
        Validators.required
        ]
      ],
      'engineerbachelor': ['', [
        ]
      ],
      'engineermaster': ['', [
        ]
      ],
      'nekorfek': ['', [
        ]
      ],
      'filfakspecialization': ['', [
        ]
      ],
      'specialfood': ['', [
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
  get program() { return this.signupForm.get('program') }
  get year() { return this.signupForm.get('year') }

  // get catchPhrase() { return this.detailForm.get('catchPhrase') }

  async signup(data) {
    this.loading = true;
    try {
      await this.auth.emailSignUp(data);
      this.router.navigate(['registered']);
      if (navigator.userAgent.indexOf('gonative') > -1) {
        var info = {userId: this.auth.getUserID(), userEmail: this.auth.getUserEmail()};
        var json = JSON.stringify(info);
        setTimeout(function() {
          window.location.href ='gonative://registration/send?customData=' + encodeURIComponent(json);
        }, 500);
      }
      this.loading = false;
      // this.auth.createProfile(data);
    } catch(error) {
      this.loading = false;
      this.errorMessage = error;
    }
  }

  // Step 2
  // setCatchPhrase(user) {
  //   return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value })
  // }


}
