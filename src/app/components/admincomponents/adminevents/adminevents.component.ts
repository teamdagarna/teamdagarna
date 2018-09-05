import { Component, OnInit } from '@angular/core';
import { Event } from '../../../shared/models';
import { switchMap, map} from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';

@Component({
  selector: 'app-adminevents',
  templateUrl: './adminevents.component.html',
  styleUrls: ['./adminevents.component.scss']
})
export class AdmineventsComponent implements OnInit {
events: any;
  constructor(private afs: AngularFirestore) {
    this.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  ngOnInit() {
  }

  getEvents() {
    return this.afs.collection<Event>('events').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Event;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

}
