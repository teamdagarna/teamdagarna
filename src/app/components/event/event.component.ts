import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Event, AttendEvent } from '../../shared/models';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  selectedEvent: Event | any;
  user: any;
  eventid: string;
  numberofsignups = 0;
  numberofreserves = 0;
  attended = false;
  attendedDoc: any;
  signups: any[] = [];
  reserves: any[] = [];
  confirmDelete = false;
  confirmAttend = false;
  confirmReserv = false;
  attenderror = false;
  loading = false;
  today = new Date();
  loaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    public auth: AuthService
  ) {
    this.eventid = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.loadAttendance();
    });

    this.getEvent(this.eventid).subscribe(event => {
      this.selectedEvent = event;
    });
  }

  /** Getters for template conditions */
  get canSignOn(): boolean {
    return this.selectedEvent?.signonstarts.toDate() < this.today &&
           this.selectedEvent?.signonends.toDate() > this.today;
  }

  get canSignOff(): boolean {
    return this.selectedEvent?.signonstarts.toDate() < this.today &&
           this.selectedEvent?.signoffends?.toDate() > this.today;
  }

  get canAttend(): boolean {
    if (this.selectedEvent?.splitcapacity) {
      const category = this.getCategory(this.user.program);
      const cap = category === 'indek' ? this.selectedEvent.maxindek : this.selectedEvent.maxekonom;
      const countInCategory = this.signups.filter(s => this.getCategory(s.program) === category).length;
      return Number(cap) === 0 || countInCategory < Number(cap);
    }

    const max = Number(this.selectedEvent?.maxattendance);
    return max === 0 || this.numberofsignups < max;
  }

  /** Load attendance data */
  loadAttendance() {
    this.getAttendance().subscribe(att => {
      this.numberofsignups = _.size(_.filter(att, ['waitinglist', false]));
      this.signups = _.orderBy(_.filter(att, ['waitinglist', false]), ['timestamp'], ['asc']);
      this.numberofreserves = _.size(_.filter(att, ['waitinglist', true]));
      this.reserves = _.orderBy(_.filter(att, ['waitinglist', true]), ['timestamp'], ['asc']);

      const userAttend = _.find(att, ['attendant', this.user.uid]);
      if (userAttend) {
        this.attended = true;
        this.attendedDoc = userAttend;
      } else {
        this.attended = false;
        this.attendedDoc = null;
      }
      this.loaded = true;
    });
  }

  /** Firestore queries */
  getEvent(id: string): Observable<Event> {
    return this.afs.collection('events').doc<Event>(id).valueChanges();
  }

  getAttendance() {
    return this.afs.collection<AttendEvent>('attendevent', ref =>
      ref.where('event', '==', this.eventid)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AttendEvent;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  /** Build AttendEvent object */
  private buildAttendEvent(waitinglist = false): AttendEvent {
    const teammates = this.teammates
      .map(t => t.value.trim())
      .filter(t => t.length > 0);

    const attendEvent: AttendEvent = {
      event: this.eventid,
      eventtitle: this.selectedEvent.title,
      attendant: this.user.uid,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      liuid: this.user.liuid,
      program: this.user.program,
      specialfood: this.user.specialfood,
      getsfood: !waitinglist && this.numberofsignups < this.selectedEvent.foodportions,
      waitinglist,
      timestamp: new Date(),
      checkedin: false
    };

    if (teammates.length > 0) {
      attendEvent.teammates = teammates;
    }

    if (this.selectedEvent.askquestion && this.questionAnswer.trim().length > 0) {
    attendEvent.questionanswer = this.questionAnswer.trim();
    }

    return attendEvent;
  }

  /** Attend / Reserve / Delete methods */
  async attend() {
  if (!this.canAttend || this.attended) {
    this.attenderror = true;
    return;
  }
  this.loading = true;
  this.confirmDelete = false;
  this.confirmReserv = false;
  await this.afs.collection<AttendEvent>('attendevent').add(this.buildAttendEvent());
  this.confirmAttend = true;
  this.loading = false;
  this.setGoNativeTag(true);
  }

  async reserv() {
    this.loading = true;
    this.confirmDelete = false;
    this.confirmAttend = false;
    await this.afs.collection<AttendEvent>('attendevent').add(this.buildAttendEvent(true));
    this.confirmReserv = true;
    this.loading = false;
    this.setGoNativeTag(false);
  }

  async delete() {
    if (!this.attendedDoc.waitinglist) {
      if (this.attendedDoc.getsfood && this.numberofsignups > this.selectedEvent.foodportions && this.selectedEvent.maxattendance > this.selectedEvent.foodportions) {
        const docid = this.signups[this.selectedEvent.foodportions].id;
        await this.afs.doc(`attendevent/${docid}`).update({ getsfood: true });
      }
      if (this.numberofreserves > 0 && this.numberofsignups <= this.selectedEvent.maxattendance) {
        const reservid = this.reserves[0].id;
        const updateData: any = { waitinglist: false };
        if (this.attendedDoc.getsfood && this.selectedEvent.maxattendance === this.selectedEvent.foodportions) {
          updateData.getsfood = true;
        }
        await this.afs.doc(`attendevent/${reservid}`).update(updateData);
      }
    }
    await this.afs.doc(`attendevent/${this.attendedDoc.id}`).delete();
    this.confirmDelete = true;
    this.setGoNativeTag(false);
  }

  private setGoNativeTag(value: boolean) {
    if (navigator.userAgent.includes('gonative')) {
      const tags: any = {};
      tags[this.eventid] = value ? true : '';
      window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(tags));
    }
  }

  teammates: { value: string }[] = [];
  questionAnswer: string = '';

  addTeammate() {
    if (this.teammates.length < 3) {
      this.teammates.push({ value: '' });
    }
  }

  removeTeammate(index: number) {
    this.teammates.splice(index, 1);
  }

  private getCategory(program: string): 'indek' | 'ekonom' {
    const indekPrograms = ['Industriell Ekonomi', 'Industriell Ekonomi Internationell'];
    return indekPrograms.includes(program) ? 'indek' : 'ekonom';
  }
}