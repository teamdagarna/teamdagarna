import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  resetPassword(data) {
    var liumail = data.liuid + '@teststudent.se';
    console.log(liumail)
     this.auth.resetPassword(liumail);
     this.router.navigate(['signin']);

   }

}
