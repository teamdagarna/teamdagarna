import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  sent: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  verify() {
    try {
      this.auth.newVerify()
    } catch(err) {
      console.log(err);
    }
    this.sent = true;
  }
}
