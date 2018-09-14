import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Dreamteamer } from '../../../shared/models';
import { tap, first } from 'rxjs/operators';
import { switchMap, map} from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'app-dreamteams',
  templateUrl: './dreamteams.component.html',
  styleUrls: ['./dreamteams.component.scss']
})
export class DreamteamsComponent implements OnInit {

  changemode: boolean = false;

  changeDreamteamerForm: FormGroup;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  imagepath: string = '';
  logoUploaded: boolean = false;
  dreamteamer: any;
  dreamteam: any;
  dreamteamerID: any;

  constructor(public fb: FormBuilder, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.getDreamteam().subscribe(dreamteam => {
        this.dreamteam = _.orderBy(dreamteam, ['name'])
    });
  }

  ngOnInit() {
    this.changeDreamteamerForm = this.fb.group({
      'fullname': ['', [Validators.required]],
      'secondaryimagepath': ['', []],
      'phone': ['', [Validators.required]],
      'mail': ['', [Validators.required]],
      'linkedinurl': ['', []],
      'about': ['', []],
    });
  }

  preloadData(id) {
    this.afs.doc<Dreamteamer>(`dreamteam/${id}`).valueChanges().pipe(
      tap(data => {
        this.changeDreamteamerForm.patchValue(data)
      })
    ).subscribe();
  }

  startUpload(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    const path = `dreamteam/${new Date().getTime()}_${file.name}`;
    this.imagepath = path;
    this.task = this.storage.upload(path, file)
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()
    this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
    ).subscribe()
    this.logoUploaded = true;
  }

  getDreamteam() {
    return this.afs.collection<Dreamteamer>('dreamteam').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Dreamteamer;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  submit(data) {
    try {
      const formValue = this.changeDreamteamerForm.value;
      this.afs.doc(`dreamteam/${this.dreamteamerID}`).update(formValue)
      if (this.imagepath !== '') {
        this.afs.doc(`dreamteam/${this.dreamteamerID}`).update({ primaryimagepath: this.imagepath })
      }
    } catch(err) {
      console.log(err)
    }
    this.changemode = false;
  }

  changeMode(id: any) {
    this.changemode = true;
    this.preloadData(id);
    this.dreamteamerID = id;
  }

}
