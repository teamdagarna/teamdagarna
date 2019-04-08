import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  user;

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
   }

  ngOnInit() {
    this.auth.signOut();
  }

}
