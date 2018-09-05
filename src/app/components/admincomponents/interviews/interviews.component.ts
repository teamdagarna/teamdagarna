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

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {


companies: any;
company: any;
interviews: any;


  constructor(private readonly afs: AngularFirestore) {
    this.getCompanies().subscribe(companies => {
        this.companies = _.filter(companies, function(company) {
         if (company.offersinterview) {
          return true;
         } else {
          return false;
         }
         });
         this.companies = _.orderBy(this.companies, ['name'])
         this.company = this.companies[0];
         console.log(this.company.id)
         this.getInterviews().subscribe(interviews => {
             this.interviews = interviews;
         });
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

    this.company = _.find(this.companies, ['id', company]);

  }

  getInterviews() {

    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('company', '==', this.company.id);
    }).valueChanges();
  }

}
