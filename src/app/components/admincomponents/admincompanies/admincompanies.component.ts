import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from '../../../services/firestore.service';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-admincompanies',
  templateUrl: './admincompanies.component.html',
  styleUrls: ['./admincompanies.component.scss']
})
export class AdmincompaniesComponent implements OnInit {


    searchterm: string;

      startAt = new Subject();
      endAt = new Subject();

      clubs;
      allclubs;

      startobs = this.startAt.asObservable();
      endobs = this.endAt.asObservable();

  constructor(private firestoreRetriever: FirestoreService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.getallclubs().subscribe((clubs) => {
      this.allclubs = clubs;
      this.clubs = this.allclubs;
    })
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
        this.clubs = clubs;
      })
    })
  }

  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.clubs = this.allclubs;
    }
  }

  firequery(start, end) {
    return this.afs.collection('users', ref => ref.limit(50).orderBy('email').startAt(start).endAt(end)).valueChanges();
  }

  getallclubs() {
    return this.afs.collection('users', ref => ref.orderBy('email')).valueChanges();
  }

}
