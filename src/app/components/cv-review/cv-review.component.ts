import { Component } from '@angular/core';

@Component({
  selector: 'app-cv-review',
  templateUrl: './cv-review.component.html',
  styleUrls: ['./cv-review.component.scss']
})
export class CvReviewComponent {
  
  isApplicationOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkTime();
  }

    checkTime() {
    const now = new Date();

    // Open the 17th of September 2025, 12:00:00
    const openApplicationDate = new Date(2025, 8, 7, 12, 0, 0); // 0-index months so 8 = September
    const closeApplicationDate = new Date(2025, 8, 24, 10, 0, 0);
    
    if (now > closeApplicationDate) {
      this.isApplicationOpen = false;
    } else if (now > openApplicationDate) {
      this.isApplicationOpen = true;
    } else {
      this.isApplicationOpen = false;
    }
  }
}