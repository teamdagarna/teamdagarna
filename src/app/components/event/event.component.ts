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
  attenderror: boolean = false;
  loading:boolean = false;
  food: boolean = false;
  today;
  loaded: boolean = false;


  constructor(private router: Router, private findRoute: ActivatedRoute, private afs: AngularFirestore, public auth: AuthService) {
      this.eventid = this.findRoute.snapshot.params.id;
      this.today = new Date()
      this.auth.user$.subscribe(user => {
        this.user = user;
        this.getAttendance().subscribe(att => {
            this.numberofsignups = _.size(_.filter(att, ['waitinglist', false]));
            this.signups = _.orderBy(_.filter(att, ['waitinglist', false]), ['timestamp'], ['asc']);
            this.numberofreserves = _.size(_.filter(att, ['waitinglist', true]));
            this.reserves = _.orderBy(_.filter(att, ['waitinglist', true]), ['timestamp'], ['asc']);
            if (_.find(att, function(o) { return o.attendant == user.uid; })) {
              this.attended = true;
              this.attendedDoc = _.find(att, function(o) { return o.attendant == user.uid; });
            }
            this.loaded = true;
          });
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
        // .where('waitinglist', '==', false)
        .where('event', '==', this.eventid);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as AttendEvent;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  // getReserves() {
  //   return this.afs.collection<AttendEvent>('attendevent', ref => {
  //     return ref
  //       .where('waitinglist', '==', true)
  //       .where('event', '==', this.eventid);
  //   }).snapshotChanges().pipe(
  //    map(actions => actions.map(a => {
  //      const data = a.payload.doc.data() as AttendEvent;
  //      const id = a.payload.doc.id;
  //      return { id, ...data };
  //    }))
  //  );
  // }

  attend() {
    this.loading = true;
    if (this.numberofsignups >= this.selectedEvent.maxattendance && this.selectedEvent.maxattendance != 0 || this.attended) {
      this.attenderror = true;
      this.loading = false;
    } else {
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
        program: this.user.program,
        specialfood: this.user.specialfood,
        getsfood: this.food,
        waitinglist: false,
        timestamp: new Date(),
        checkedin: false
      }

      eventsCollection.add(newAttend).then(() => {
          this.confirmAttend = true;
          this.loading = false;
      });
    }
    if (navigator.userAgent.indexOf('gonative') > -1) {
      var tags = {};
      tags[this.eventid] = true;

      window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(tags));
    }
  }

  reserv() {
    this.loading = true;
    const eventsCollection = this.afs.collection<AttendEvent>('attendevent');
    const newAttend: AttendEvent = {
      event: this.eventid,
      eventtitle: this.selectedEvent.title,
      attendant: this.user.uid,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      liuid: this.user.liuid,
      program: this.user.program,
      specialfood: this.user.specialfood,
      getsfood: false,
      waitinglist: true,
      timestamp: new Date(),
      checkedin: false
    }

    eventsCollection.add(newAttend).then(() => {
        this.confirmReserv = true;
        this.loading = false;
    });
  }

  delete() {
    if (!this.attendedDoc.waitinglist) {
      if (this.attendedDoc.getsfood && this.numberofsignups > this.selectedEvent.foodportions && this.selectedEvent.maxattendance > this.selectedEvent.foodportions) {
        const index = this.selectedEvent.foodportions;
        console.log(this.signups[index].id)
        const docid = this.signups[index].id;
        this.afs.doc(`attendevent/${docid}`).update({ getsfood: true })
      }
      if (this.numberofreserves > 0 && this.numberofsignups <= this.selectedEvent.maxattendance) {
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
    }

    this.afs.doc(`attendevent/${this.attendedDoc.id}`).delete().then(() => {
      this.confirmDelete = true;
    });
    if (navigator.userAgent.indexOf('gonative') > -1) {
      var tags = {};
      tags[this.eventid] = '';

      window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(tags));
    }
  }

}
