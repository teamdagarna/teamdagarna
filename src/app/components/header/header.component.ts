import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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
  }
  ngOnInit() {}
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
  closeMenu() {
    console.log('closeMenu called');
    this.isMenuActive = false;
  }
}