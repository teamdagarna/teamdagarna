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

  constructor(public auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  redirectToLogin(): void {
    this.router.navigate(['/signin']); 
  }

}