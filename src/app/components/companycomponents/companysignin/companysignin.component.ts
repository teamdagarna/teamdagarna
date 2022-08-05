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
  loading: boolean = false;

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
    this.loading = true;
    var mail = data.mail + '@teamdagarna.com'
    this.auth.emailLogin(mail, data.password).then((res) => {
          this.loading = false;
          this.router.navigate(['companyguest']);
          if (navigator.userAgent.indexOf('gonative') > -1) {
            var items = [{
              subLinks: [],
              label: "Hem",
              url: "https://teamdagarna.com/",
              icon: "fa-home"
            },
            {
              subLinks: [
                {
                  subLinks: [],
                  label: "Sök DreamTEAM",
                  url: "https://teamdagarna.com/sokdreamteam"
                },
                {
                  subLinks: [],
                  label: "Företagen 2022",
                  url: "https://teamdagarna.com/companies"
                },
                {
                  subLinks: [],
                  label: "Kontaktsamtal",
                  url: "https://teamdagarna.com/interview"
                },
                {
                  subLinks: [],
                  label: "Event",
                  url: "https://teamdagarna.com/events"
                }
              ],
              label: "För Studenter",
              isGrouping: true,
              icon: "fa-users"
            },
            {
              subLinks: [
                {
                  subLinks: [],
                  label: "Om TEAM-dagarna",
                  url: "https://teamdagarna.com/about"
                },
                {
                  subLinks: [],
                  label: "FAQ",
                  url: "https://teamdagarna.com/faq"
                },
                {
                  subLinks: [],
                  label: "Erbjudande",
                  url: "https://teamdagarna.com/weoffer"
                },
                {
                  subLinks: [],
                  label: "Hitta hit",
                  url: "https://teamdagarna.com/weoffer"
                },
                {
                  subLinks: [],
                  label: "Företagssida",
                  url: "https://teamdagarna.com/companyguest"
                }
              ],
              label: "För företag",
              isGrouping: true,
              icon: "fa-briefcase"
            },
            {
              subLinks: [
                {
                  subLinks: [],
                  label: "Kontakt",
                  url: "https://teamdagarna.com/dreamteam"
                },
                {
                  subLinks: [],
                  label: "Om TEAM-dagarna",
                  url: "https://teamdagarna.com/about"
                },
                {
                  subLinks: [],
                  label: "Hållbarhet",
                  url: "https://teamdagarna.com/hallbarhet"
                }
              ],
              label: "Om oss",
              isGrouping: true,
              icon: "fa-question"
            },
            {
              subLinks: [],
              label: "English info",
              url: "https://teamdagarna.com/about-english",
              icon: "fa-cog"
            },
            {
              subLinks: [],
              label: "Din profil",
              url: "https://teamdagarna.com/profile",
              icon: "fa-user"
            },
            {
              subLinks: [],
              label: "Logga ut",
              url: "https://teamdagarna.com/signout",
              icon: "fa-sign-out"
            }
          ];

          var json = JSON.stringify(items);

          window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
        }
       }).catch((error) => {
         this.loading = false;
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
