import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {

  isApplicationOpen: boolean = false;

  constructor() { }

  ngOnInit() {
    this.checkTime();
  }

  checkTime() {
    const now = new Date();

    // Stäng ansökan 2:a september, kl. 23:59:59
    const closeApplicationDate = new Date(now.getFullYear(), 8, 2, 23, 59, 59, 999); // OBS! Månaden är 0-indexerad, så 8 = september

    if (now < closeApplicationDate) {
      this.isApplicationOpen = true;

      const timeUntilHide = closeApplicationDate.getTime() - now.getTime();
      setTimeout(() => {
        this.isApplicationOpen = false;
      }, timeUntilHide);
    } else {
      this.isApplicationOpen = false;
    }
  }
}
