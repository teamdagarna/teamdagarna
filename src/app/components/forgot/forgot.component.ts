import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  submitted = false;
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword(data) {
    const liumail = data.liuid + '@student.liu.se';
    this.loading = true;
    this.errorMessage = '';

    this.auth.resetPassword(liumail)
      .then(() => {
        this.loading = false;
        this.submitted = true;
      })
      .catch((error) => {
        this.loading = false;
        console.error('Password reset failed:', error);
        this.errorMessage = 'Något gick fel. Kontrollera ditt LiU-ID och försök igen.';
      });
  }
}