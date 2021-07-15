import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../../shared/models';
import { switchMap, map} from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit {

  events: any;
  fairevents: any;
  preevents: any;
  otherevents: any;
  toggleEvent: boolean = false;
  selectedEvent: any = null;

  constructor(private afs: AngularFirestore) {
    this.getBlogposts().subscribe(events => {

    });
  }

  ngOnInit() {
  }

  getBlogposts() {
    return this.afs.collection<Blogpost>('news', ref => {
      return ref
        .where('published', '==', true);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Blogpost;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  closeBlogposts() {
    this.toggleEvent = false;
  }
  openEvent(selectedEvent: any) {
    this.selectedEvent = selectedEvent;
    this.toggleEvent = true;
  }
}
