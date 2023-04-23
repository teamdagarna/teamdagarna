import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models';
import { switchMap, map} from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any;
  fairevents: any;
  preevents: any;
  otherevents: any;
  toggleEvent: boolean = false;
  selectedEvent: any = null;

  constructor(private afs: AngularFirestore) {
    this.getEvents().subscribe((events: any) => {
      console.log(events)
      this.events = events;
      this.fairevents = _.orderBy(_.filter(events, function(event) {
       return (event.preorunder == 'Mässdagarna')
     }), ['eventstarts'], ['asc']);
       this.preevents = _.orderBy(_.filter(events, function(event) {
        return (event.preorunder == 'Infördagarna')
      }), ['eventstarts'], ['asc']);
      this.otherevents = _.orderBy(_.filter(events, function(event) {
        return (event.preorunder == 'Övrigt')
      }), ['eventstarts'], ['asc']);

    });
  }

  ngOnInit() {
  }

  getEvents() {
    return this.afs.collection<Event>('events', ref => {
      return ref
        .where('published', '==', true);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Event;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  closeEvent() {
    this.toggleEvent = false;
  }
  openEvent(selectedEvent: any) {
    this.selectedEvent = selectedEvent;
    this.toggleEvent = true;
  }
}
