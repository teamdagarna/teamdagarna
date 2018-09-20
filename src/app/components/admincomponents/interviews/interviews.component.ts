import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company, InterviewApplication } from '../../../shared/models';
import * as _ from 'lodash';
import { AuthService } from '../../../services/auth.service';
import { switchMap, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {


companies: any;
company: any;
interviews: any;
selectedinterviews: any;
selectedbutdeclinedinterviews: any;
notselectedinterviews: any;
backupinterviews: any;
allaccpetedinterviews: any;
schedule: any;


  constructor(private readonly afs: AngularFirestore, private datePipe: DatePipe) {
    this.getCompanies().subscribe(companies => {
        this.companies = _.filter(companies, function(company) {
         if (company.offersinterview) {
          return true;
         } else {
          return false;
         }
         });
         this.companies = _.orderBy(this.companies, ['name'])
    });

    this.getAllAcceptedInterviews().subscribe(interviews => {
        this.allaccpetedinterviews = interviews;
    });

  }

  ngOnInit() {
  }

  getCompanies() {
    return this.afs.collection<Company>('companies').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Company;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getCompany(company) {
    console.log(company);
    this.company = _.find(this.companies, ['id', company]);
    this.getInterviews(company).subscribe(interviews => {
        this.getOpenInterviews(company).subscribe(openinterviews => {
          this.interviews = _.union(interviews, openinterviews);
          this.selectedinterviews = _.union(_.filter(interviews, {'selected': true, 'studentdeclined': false }),_.filter(openinterviews, {'selected': true, 'studentdeclined': false }));
          this.selectedbutdeclinedinterviews = _.union(_.filter(interviews, {'selected': true, 'studentdeclined': true }),_.filter(openinterviews, {'selected': true, 'studentdeclined': true }));
          this.notselectedinterviews = _.union(_.filter(interviews, [{'selected': false, 'backup': false }]), _.filter(openinterviews, [{'selected': false, 'backup': false }]));
          this.backupinterviews = _.orderBy(_.union(_.filter(interviews, ['backup', true]),_.filter(openinterviews, ['backup', true])),['backupnumber'], ['asc']);
          this.schedule = _.orderBy(this.selectedinterviews,['time'], ['asc'])
        });
    });

  }

  getInterviews(company: any) {
    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('company', '==', company);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       const numberofaccepted = _.size(_.filter(this.allaccpetedinterviews, ['applicant', a.payload.doc.data().applicant]));
       const applicantsapplications = _.filter(this.allaccpetedinterviews, ['applicant', a.payload.doc.data().applicant]);
       let alltimes = '';
       for (let index = 0; index < applicantsapplications.length; ++index) {
         if (applicantsapplications[index].day !== undefined && applicantsapplications[index].time !== undefined) {
           alltimes += applicantsapplications[index].day[0] + applicantsapplications[index].time;
         }
        }
       return { id, numberofaccepted, alltimes, ...data };
     }))
   );
  }

  getOpenInterviews(company: any) {
    return this.afs.collection<InterviewApplication>('openinterviews', ref => {
      return ref
        .where('company', '==', company);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       const numberofaccepted = _.size(_.filter(this.allaccpetedinterviews, ['applicant', a.payload.doc.data().applicant]));
       const applicantsapplications = _.filter(this.allaccpetedinterviews, ['applicant', a.payload.doc.data().applicant]);
       let alltimes = '';
       for (let index = 0; index < applicantsapplications.length; ++index) {
         if (applicantsapplications[index].day !== undefined && applicantsapplications[index].time !== undefined) {
           alltimes += applicantsapplications[index].day[0] + applicantsapplications[index].time + ',';
         }
        }
       return { id, numberofaccepted, alltimes, ...data };
     }))
   );
  }

  getAllAcceptedInterviews() {
    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('studentaccepted', '==', true);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getApplicantsInterviews(applicant: any) {
    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('applicant', '==', applicant);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  setDay(day: any, id: any) {
    if (day !== '-1') {
    this.afs.doc(`interviews/${id}`)
        .update({
          day: day
        })
        .then(() => {
      }).catch((error) => {
      this.afs.doc(`openinterviews/${id}`)
        .update({
          day: day
        });
      });
    }
  }

  setTime(time: any, id: any) {
    const hhmmtime = this.transformDate(time);
    this.afs.doc(`interviews/${id}`)
        .update({
          time: hhmmtime
        })
        .then(() => {
      }).catch((error) => {
      this.afs.doc(`openinterviews/${id}`)
        .update({
          time: hhmmtime
        });
      });
  }

  setStudentResponse(rule: any, id: any) {

    if (rule == 'yes') {
      this.afs.doc(`interviews/${id}`)
          .update({
            studentaccepted: true,
            studentdeclined: false,
            studentnotanswered: false
          })
          .then(() => {
        }).catch((error) => {
        this.afs.doc(`openinterviews/${id}`)
          .update({
            studentaccepted: true,
            studentdeclined: false,
            studentnotanswered: false
          });
        });
    } else if (rule == 'no') {
      this.afs.doc(`interviews/${id}`)
          .update({
            studentaccepted: false,
            studentdeclined: true,
            studentnotanswered: false
          })
          .then(() => {
        }).catch((error) => {
        this.afs.doc(`openinterviews/${id}`)
          .update({
            studentaccepted: false,
            studentdeclined: true,
            studentnotanswered: false
          });
        });
    } else if (rule == 'no') {
      this.afs.doc(`interviews/${id}`)
          .update({
            studentaccepted: false,
            studentdeclined: false,
            studentnotanswered: true
          })
          .then(() => {
        }).catch((error) => {
        this.afs.doc(`openinterviews/${id}`)
          .update({
            studentaccepted: false,
            studentdeclined: false,
            studentnotanswered: true
          });
        });
    }
  }

  setSelected(id: any) {
    this.afs.doc(`interviews/${id}`)
        .update({
          selected: true,
          backup: false
        })
        .then(() => {
      }).catch((error) => {
      this.afs.doc(`openinterviews/${id}`)
        .update({
          selected: true,
          backup: false
        });
      });
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'HH:mm');
  }

}
