import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InterviewApplication } from '../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, AttendEvent, Event } from '../../shared/models';
import { tap, first } from 'rxjs/operators';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;
  interviews: any;
  openinterviews: any;

  changeForm: FormGroup;
  errorMessage: string;

  changeMode = false;
  updated = false;

  acceptavailable: boolean = true;

  events;

  constructor(public auth: AuthService, private readonly afs: AngularFirestore, public fb: FormBuilder) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.getInterviews().subscribe(interviews => {
          this.interviews = interviews;
          this.checkRestrictions();
      });
      this.getOpenInterviews().subscribe(interviews => {
        this.openinterviews = _.filter(interviews, function(o) { return (o.selected == true || o.backup == true) });
        this.checkRestrictions();
      });
      this.preloadData();
      this.getAttendance().subscribe(att => {
            this.events = att;
        });
    });

   }

  ngOnInit() {

    this.changeForm = this.fb.group({
      'firstname': ['', [
        Validators.required
        ]
      ],
      'lastname': ['', [
        Validators.required
        ]
      ],
      'program': ['', [
        Validators.required
        ]
      ],
      'year': ['', [
        Validators.required
        ]
      ],
      'engineerbachelor': ['', [
        ]
      ],
      'engineermaster': ['', [
        ]
      ],
      'nekorfek': ['', [
        ]
      ],
      'filfakspecialization': ['', [
        ]
      ],
      'specialfood': ['', [
        ]
      ],
    });

  }


  get firstname() { return this.changeForm.get('firstname') }
  get lastname() { return this.changeForm.get('lastname') }
  get program() { return this.changeForm.get('program') }
  get year() { return this.changeForm.get('year') }

  getInterviews() {
    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('applicant', '==', this.user.uid);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }
  getOpenInterviews() {
    return this.afs.collection<InterviewApplication>('openinterviews', ref => {
      return ref
        .where('applicant', '==', this.user.uid);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getAttendance() {
    return this.afs.collection<AttendEvent>('attendevent', ref => {
      return ref
        .where('attendant', '==', this.user.uid)
        .where('checkedin', '==', false);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as AttendEvent;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getEventDate(event: any) {
    var datevalue;
    console.log(event)
    datevalue = this.afs.doc<Event>(`events/${event}`);
    console.log(datevalue.title)
    return datevalue.title;

  }

  submit(data) {
    const formValue = this.changeForm.value;
   this.auth.updateUser(this.user, formValue).then((res) => {
        this.changeMode = false;
        this.updated = true;
      }).catch((error) => {

          this.errorMessage = 'Något gick fel.. Testa igen.';

      });
  }

  preloadData() {
  this.afs.doc<User>(`users/${this.user.uid}`).valueChanges().pipe(
    tap(data => {
      this.changeForm.patchValue(data)
    })
  )
    .subscribe()
  }

  toggleChange() {
        this.preloadData()
    this.changeMode = !this.changeMode;

  }

  changeInterviewAnswer(id, accepted) {
    if (accepted && this.acceptavailable) {
      return this.afs.doc(`interviews/${id}`).update({
        studentnotanswered: false,
        studentaccepted: true,
        studentdeclined: false
      })
    } else if (!accepted) {
      return this.afs.doc(`interviews/${id}`).update({
        studentnotanswered: false,
        studentaccepted: false,
        studentdeclined: true
      })
    }
  }

  changeOpenInterviewAnswer(id, accepted) {
    if (accepted && this.acceptavailable) {
      return this.afs.doc(`openinterviews/${id}`).update({
        studentnotanswered: false,
        studentaccepted: true,
        studentdeclined: false
      })
    } else if (!accepted) {
      return this.afs.doc(`openinterviews/${id}`).update({
        studentnotanswered: false,
        studentaccepted: false,
        studentdeclined: true
      })
    }
  }

  checkRestrictions() {
    if ((_.size(_.filter(this.interviews, 'studentaccepted')) + _.size(_.filter(this.openinterviews, 'studentaccepted'))) >= 6) {
      this.acceptavailable = false;
    } else {
      this.acceptavailable = true;
    }
  }



}
