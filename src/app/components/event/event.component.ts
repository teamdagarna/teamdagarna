import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Event, AttendEvent } from '../../shared/models';
import { AuthService } from '../../services/auth.service';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  selectedEvent: any;
  user;
  eventid: any;
  numberofsignups: number = 0;
  numberofreserves: number = 0;
  attended: boolean = false;
  attendedDoc: any;
  signups: any;
  reserves: any;
  confirmDelete: boolean = false;
  confirmAttend: boolean = false;
  confirmReserv: boolean = false;
  food: boolean = false;
  today;


  constructor(private router: Router, private findRoute: ActivatedRoute, private afs: AngularFirestore, public auth: AuthService) {
      this.eventid = this.findRoute.snapshot.params.id;
      this.today = new Date()
      this.auth.user$.subscribe(user => {
        this.user = user;
        this.getAttendance().subscribe(att => {
            this.numberofsignups = _.size(att);
            this.signups = _.orderBy(att, ['timestamp'], ['asc']);
            if (_.find(att, function(o) { return o.attendant == user.uid; })) {
              this.attended = true;
              this.attendedDoc = _.find(att, function(o) { return o.attendant == user.uid; });
            }
          });
        });

      this.getReserves().subscribe(att => {
          this.numberofreserves = _.size(att);
          this.reserves = _.orderBy(att, ['timestamp'], ['asc']);
      });

      this.getEvent(this.eventid).subscribe(event => {
          this.selectedEvent = event;
          console.log(event)
      });
   }

  ngOnInit() {
  }

  getEvent(id) {
    return this.afs.collection('events').doc<Event>(id).valueChanges();
  }

  getAttendance() {
    return this.afs.collection<AttendEvent>('attendevent', ref => {
      return ref
        .where('waitinglist', '==', false);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as AttendEvent;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getReserves() {
    return this.afs.collection<AttendEvent>('attendevent', ref => {
      return ref
        .where('waitinglist', '==', true);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as AttendEvent;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  attend() {

    if (this.numberofsignups < this.selectedEvent.foodportions) {
      this.food = true;
    }

    const eventsCollection = this.afs.collection<AttendEvent>('attendevent');
    const newAttend: AttendEvent = {
      event: this.eventid,
      eventtitle: this.selectedEvent.title,
      attendant: this.user.uid,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      liuid: this.user.liuid,
      specialfood: this.user.specialfood,
      getsfood: this.food,
      waitinglist: false,
      timestamp: new Date(),
      checkedin: false
    }

    eventsCollection.add(newAttend).then(() => {
        this.confirmAttend = true;
    });
  }

  reserv() {
    const eventsCollection = this.afs.collection<AttendEvent>('attendevent');
    const newAttend: AttendEvent = {
      event: this.eventid,
      eventtitle: this.selectedEvent.title,
      attendant: this.user.uid,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      liuid: this.user.liuid,
      specialfood: this.user.specialfood,
      getsfood: false,
      waitinglist: true,
      timestamp: new Date(),
      checkedin: false
    }

    eventsCollection.add(newAttend).then(() => {
        this.confirmReserv = true;
    });
  }

  delete() {
    if (this.attendedDoc.getsfood && this.numberofsignups > this.selectedEvent.foodportions && this.selectedEvent.maxattendance > this.selectedEvent.foodportions) {
      console.log('HIT')
      const index = this.selectedEvent.foodportions;
      console.log(this.signups[index].id)
      const docid = this.signups[index].id;
      this.afs.doc(`attendevent/${docid}`).update({ getsfood: true })
    }
    if (this.numberofreserves > 0) {
      const reservid = this.reserves[0].id;
      if (this.attendedDoc.getsfood && this.selectedEvent.maxattendance == this.selectedEvent.foodportions) {
        this.afs.doc(`attendevent/${reservid}`).update({
          getsfood: true,
          waitinglist: false
        })
      } else {
        this.afs.doc(`attendevent/${reservid}`).update({ waitinglist: false })
      }
    }

    this.afs.doc(`attendevent/${this.attendedDoc.id}`).delete().then(() => {
      this.confirmDelete = true;
    });
  }

}
