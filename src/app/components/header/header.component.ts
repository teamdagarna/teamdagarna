import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','../../../styles.scss']
})
export class HeaderComponent implements OnInit {

  user;
  isMenuActive: boolean = false;  

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
  }

  ngOnInit() {}


  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

}
