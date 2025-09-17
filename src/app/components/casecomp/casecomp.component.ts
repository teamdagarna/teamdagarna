import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-casecomp',
  templateUrl: './casecomp.component.html',
  styleUrls: ['./casecomp.component.scss']
})
export class CasecompComponent implements OnInit {

  user: any;
  isApplicatoinOpen: boolean = false;

  constructor(public auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.checkTime();
  }

  checkTime() {
    const now = new Date();
    const openDate = new Date(now.getFullYear(), 8, 4, 12, 0, 0, 0); // Set to 12:00 PM on September 4th (month is 0-indexed)
    const closeDate = new Date(now.getFullYear(), 8, 16, 23, 59, 59); // Set to 12:00 PM on September 4th (month is 0-indexed)

    if (now >= closeDate) {
      this.isApplicatoinOpen = false;
    } else if (now >= openDate) {
      this.isApplicatoinOpen = true;
    }
    console.log(this.isApplicatoinOpen);
  }

  redirectToLogin(): void {
    this.router.navigate(['/signin']); 
  }
}