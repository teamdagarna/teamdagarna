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

  signup(data) {
   this.auth.emailSignUp(data).then((res) => {
      this.router.navigate(['registered']);
         // this.auth.createProfile(data);
      }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
          this.errorMessage = 'Det finns redan ett konto registrerat på detta LiU-ID. Logga in eller återställ lösenord.';
        } else if (errorCode == 'auth/invalid-email') {
          this.errorMessage = 'Inget giltigt LiU-ID';
        } else if (errorCode == 'auth/operation-not-allowed') {
          this.errorMessage = 'Operation not allowed';
        } else if (errorCode == 'auth/weak-password') {
          this.errorMessage = 'Svagt lösenord. Testa igen.';
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
