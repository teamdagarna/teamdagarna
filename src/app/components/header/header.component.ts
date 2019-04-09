import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user;

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
   }

  ngOnInit() {
    //Checks if request comes from the app
    if (navigator.userAgent.indexOf('gonative') > -1) {
      //Checks if user is logged in and presents the content in the navbar differently depending on the answer
      if (this.auth.isSignedIn()) {
        var items = [{
          "subLinks": [],
          "label": "Hem",
          "url": "http://teamdagarna.com/",
          "icon": "fa-home"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Sök DreamTEAM",
              "url": "http://teamdagarna.com/sokdreamteam"
            },
            {
              "subLinks": [],
              "label": "Företagen 2018",
              "url": "http://teamdagarna.com/companies"
            },
            {
              "subLinks": [],
              "label": "Sök kontaktsamtal",
              "url": "https://teamdagarna.com/interview"
            },
            {
              "subLinks": [],
              "label": "Event",
              "url": "https://teamdagarna.com/events"
            }
          ],
          "label": "För Studenter",
          "isGrouping": true,
          "icon": "fa-user"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "http://teamdagarna.com/about"
            },
            {
              "subLinks": [],
              "label": "FAQ",
              "url": "https://teamdagarna.com/faq"
            },
            {
              "subLinks": [],
              "label": "Erbjudande",
              "url": "https://teamdagarna.com/weoffer"
            },
            {
              "subLinks": [],
              "label": "Hitta hit",
              "url": "https://teamdagarna.com/weoffer"
            }
          ],
          "label": "För företag",
          "isGrouping": true,
          "icon": "fa-briefcase"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Kontakt",
              "url": "https://teamdagarna.com/dreamteam"
            },
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "https://teamdagarna.com/dreamteam"
            }
          ],
          "label": "Om oss",
          "isGrouping": true,
          "icon": "fa-question"
        },
        {
          "subLinks": [],
          "label": "English info",
          "url": "https://teamdagarna.com/about-english",
          "icon": "fa-cog"
        },
        {
          "subLinks": [],
          "label": "Din profil",
          "url": "https://teamdagarna.com/profile",
          "icon": "fa-user-graduate"
        },
        {
          "subLinks": [],
          "label": "Logga ut",
          "url": "https://teamdagarna.com/signout",
          "icon": "fa-sign-out"
        }
        ];

        var json = JSON.stringify(items);

        window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);

      } else {
        var items = [{
          "subLinks": [],
          "label": "Hem",
          "url": "http://teamdagarna.com/",
          "icon": "fa-home"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Sök DreamTEAM",
              "url": "http://teamdagarna.com/sokdreamteam"
            },
            {
              "subLinks": [],
              "label": "Företagen 2018",
              "url": "http://teamdagarna.com/companies"
            },
            {
              "subLinks": [],
              "label": "Sök kontaktsamtal",
              "url": "https://teamdagarna.com/interview"
            },
            {
              "subLinks": [],
              "label": "Event",
              "url": "https://teamdagarna.com/events"
            }
          ],
          "label": "För Studenter",
          "isGrouping": true,
          "icon": "fa-user"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "http://teamdagarna.com/about"
            },
            {
              "subLinks": [],
              "label": "FAQ",
              "url": "https://teamdagarna.com/faq"
            },
            {
              "subLinks": [],
              "label": "Erbjudande",
              "url": "https://teamdagarna.com/weoffer"
            },
            {
              "subLinks": [],
              "label": "Hitta hit",
              "url": "https://teamdagarna.com/weoffer"
            }
          ],
          "label": "För företag",
          "isGrouping": true,
          "icon": "fa-briefcase"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Kontakt",
              "url": "https://teamdagarna.com/dreamteam"
            },
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "https://teamdagarna.com/dreamteam"
            }
          ],
          "label": "Om oss",
          "isGrouping": true,
          "icon": "fa-question"
        },
        {
          "subLinks": [],
          "label": "English info",
          "url": "https://teamdagarna.com/about-english",
          "icon": "fa-cog"
        },
        {
          "subLinks": [],
          "label": "Logga in",
          "url": "https://teamdagarna.com/signin",
          "icon": "fa-sign-out"
        }
      ];
      var json = JSON.stringify(items);

      window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
    }
  }
}

}
