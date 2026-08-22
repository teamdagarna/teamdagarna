import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','../../../styles.scss']
})
export class HeaderComponent implements OnInit {
  user;
  isMenuActive: boolean = false;  
  constructor(public auth: AuthService, public router: Router) {
    this.auth.user$.subscribe(user => this.user = user)

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuActive = false;
    });
  }
  ngOnInit() {}
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
  closeMenu() {
    this.isMenuActive = false;
  }
}