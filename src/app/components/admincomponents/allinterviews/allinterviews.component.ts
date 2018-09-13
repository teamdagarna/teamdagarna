import { Component, OnInit } from '@angular/core';
import { Company, Code, InterviewApplication } from '../../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-allinterviews',
  templateUrl: './allinterviews.component.html',
  styleUrls: ['./allinterviews.component.scss']
})
export class AllinterviewsComponent implements OnInit {

  interviews: any;
  filteredInterviews: any = {};

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder, public auth: AuthService) {
    this.getInterviews().subscribe(interviews => {
        this.interviews = interviews;
        this.filteredInterviews = _.orderBy(_.uniqBy(interviews, 'liuid'), ['liuid'], ['asc']);
    });
   }

  ngOnInit() {
  }

  getInterviews() {
    return this.afs.collection<InterviewApplication>('interviews').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  addToArray(value) {
    if (this.filteredInterviews.indexOf(value) === -1) {
      this.filteredInterviews.push(value);
    }
  }

}
