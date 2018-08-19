import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  user

  constructor(public auth: AuthService) {
        this.auth.user$.subscribe(user => this.user = user)
   }

  ngOnInit() {
  }

}
