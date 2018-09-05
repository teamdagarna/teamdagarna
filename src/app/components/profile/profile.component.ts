import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InterviewApplication } from '../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models';
import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;
  interviews: any;

  changeForm: FormGroup;
  errorMessage: string;

  changeMode = false;
  updated = false;

  constructor(public auth: AuthService, private readonly afs: AngularFirestore, public fb: FormBuilder) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.getInterviews().subscribe(interviews => {
          this.interviews = interviews;
      });
          this.preloadData();
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
    }).valueChanges();
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



}
