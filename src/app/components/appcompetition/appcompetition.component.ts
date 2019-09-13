import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppCompetition } from '../../shared/models';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appcompetition',
  templateUrl: './appcompetition.component.html',
  styleUrls: ['./appcompetition.component.scss']
})
export class AppcompetitionComponent implements OnInit {

  user;
  registered: boolean = false;
  submitMode: boolean = true;
  success: boolean = false;
  notsuccess: boolean = false;
  loading: boolean = false;

  constructor(public auth: AuthService, private afs: AngularFirestore, private router: Router) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.getCompetitionStatus(this.user).subscribe(registered => {
          if(registered) {
            this.registered = true;
          } else {
            this.registered = false;
          }
        });
      }
    });
   }

  ngOnInit() {}

  getCompetitionStatus(user) {
    return this.afs.doc(`appCompetition/${user.uid}`).valueChanges();
  }

  async register() {
    this.loading = true;
    const newUser: AppCompetition = {
      liuid: this.user.liuid,
      hasApp: true
    }
    try {
      await this.afs.doc(`appCompetition/${this.user.uid}`).set(newUser, {merge: true} );
      this.success = true;
    } catch(err) {
      console.log(err)
      this.notsuccess = true;
    }
    this.submitMode = false;
    this.loading = false;
  }

  refresh() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['appcompetition']));
  }

}
