import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setTag() {
    if (navigator.userAgent.indexOf('gonative') > -1) {
      var tags = {
        appliedVolunteer: 'yes'
      };

      window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(tags));
    }
  }

}
