import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
      return this.afs.collection('companies', ref => ref.limit(50).orderBy('about').startAt(start).endAt(end)).valueChanges();
    }

    getallclubs() {
      return this.afs.collection('companies', ref => ref.orderBy('about')).valueChanges();
    }

}
