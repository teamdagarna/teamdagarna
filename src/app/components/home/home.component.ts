import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.countdown()
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


  countdown() {
    var countDownDate = new Date("Sep 24, 2019 09:00:00").getTime();



      // Update the count down every 1 second
      var x = setInterval(function() {

        // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date

      if ((countDownDate - now) < 0) {
        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
      } else {
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
      // Display the result in the element with id="demo"
      document.getElementById("theEndIsNear").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

}
