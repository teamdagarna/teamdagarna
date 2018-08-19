import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
   }

  ngOnInit() {
  }

}
