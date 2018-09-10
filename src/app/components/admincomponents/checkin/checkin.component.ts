import { Component, OnInit } from '@angular/core';
import { Event, AttendEvent } from '../../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  attendants: any;
  filteredAttendants: any;
  event: any;
  events: any;
  searchValue: string= "";
  selectForm: FormGroup;

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) {
    this.getEvents().subscribe(events => {
        this.events = events;
    });

  }

  ngOnInit() {
    this.selectForm = this.fb.group({
      'event': ['', [Validators.required]]
    });
  }

  getAttendance() {
    return this.afs.collection<AttendEvent>('attendevent', ref => {
      return ref
        .where('event', '==', this.event.id)
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as AttendEvent;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getEvents() {
    return this.afs.collection<Event>('events', ref => {
      return ref
        .where('published', '==', true)
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Event;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getEvent(event) {
    this.event = _.find(this.events, { 'id': event });
    this.getAttendance().subscribe(attendants => {
        this.attendants = _.orderBy(attendants, ['firstname'], ['asc']);
        this.applySearch();
    });

  }

  onSearch(event: any) { // without type info
    this.searchValue = event.target.value;
    this.applySearch();
  }

  private applySearch() {
      const search = this.searchValue;
      this.filteredAttendants = _.filter(this.attendants, function(attendant) {
       if (_.includes(_.lowerCase(attendant.firstname), _.lowerCase(search)) || _.includes(_.lowerCase(attendant.lastname), _.lowerCase(search)) || _.includes(_.lowerCase(attendant.liuid), _.lowerCase(search))) {
        return true;
       } else {
        return false;
       }
       });
  }

}
