import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Event, AttendEvent } from '../../shared/models';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  selectedEvent: any;
  user;
  eventid: any;

  constructor(private router: Router, private findRoute: ActivatedRoute, private afs: AngularFirestore, public auth: AuthService) {
      this.eventid = this.findRoute.snapshot.params.id;

      this.auth.user$.subscribe(user => {
        this.user = user
        // this.getInterviews().subscribe(interviews => {
        //     this.applied = interviews;
        //     this.applicationsMade = _.size(interviews);
        //     this.appliedOpen = _.find(interviews, function(o) { return o.companyname == 'Öppen anmälan kontaktsamtal'; });
        //   });
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

  attend() {

    const companiesCollection = this.afs.collection<AttendEvent>('attendevent');

    const newAttend: AttendEvent = {
      event: this.eventid,
      eventtitle: this.selectedEvent.title,
      attendant: this.user.uid,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      liuid: this.user.liuid,
      specialfood: this.user.specialfood
    }

    companiesCollection.add(newAttend).then(() => {
        this.router.navigate(['../../events'])
    });


  }

}
