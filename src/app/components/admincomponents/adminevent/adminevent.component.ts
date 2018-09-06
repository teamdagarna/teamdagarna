import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Event } from '../../../shared/models';

import { tap, first } from 'rxjs/operators';

import * as _ from 'lodash';

import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adminevent',
  templateUrl: './adminevent.component.html',
  styleUrls: ['./adminevent.component.scss']
})
export class AdmineventComponent implements OnInit {

  changeEventForm: FormGroup;
  today: any;

  event: any;

  // File upload
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  imagepath: string = '';
  logoUploaded: boolean = false;

  eventid;

  constructor(public fb: FormBuilder, private afs: AngularFirestore, private storage: AngularFireStorage, private router: Router, private findRoute: ActivatedRoute, private datePipe: DatePipe) {
      this.eventid = this.findRoute.snapshot.params.id;

   }


    ngOnInit() {
      this.today = Date();

      this.changeEventForm = this.fb.group({
        'title': ['', [Validators.required]],
        'ingress': ['', []],
        'about': ['', [Validators.required]],
        'preorunder': ['', [Validators.required]],
        'location': ['', [Validators.required]],
        'eventstarts': ['', [Validators.required]],
        'eventends': ['', [Validators.required]],
        'signonstarts': ['', [Validators.required]],
        'signonends': ['', [Validators.required]],
        'signoffends': ['', [Validators.required]],
        'maxattendance': ['', [Validators.required]],
        'foodportions': ['0', []],
        'published': [false, []],
        'coolness': ['0', [Validators.required]]
      });

      this.preloadData();

    }

    submit(data) {
      try {
        const formValue = this.changeEventForm.value;
        this.afs.doc(`events/${this.findRoute.snapshot.params.id}`).update(formValue)
        if (this.imagepath !== '') {
          this.afs.doc(`events/${this.findRoute.snapshot.params.id}`).update({ imagepath: this.imagepath })
        }
      } catch(err) {
        console.log(err)
      }
      this.router.navigate(['dreamteamadmin/events']);

    }

    preloadData() {

      this.afs.doc<Event>(`events/${this.findRoute.snapshot.params.id}`).valueChanges().pipe(
        tap(data => {
          try {
            this.event = data;

            this.event.eventstarts = this.event.eventstarts.toDate()
            this.event.eventends = this.event.eventends.toDate()
            this.event.signonstarts = this.event.signonstarts.toDate()
            this.event.signonends = this.event.signonends.toDate()
            this.event.signoffends = this.event.signoffends.toDate()

            // this.changeEventForm.patchValue(data)
          } catch(err) {
            console.log(err)
          }
          console.log(this.event.eventstarts)
          this.changeEventForm.patchValue(this.event)


        })
      ).subscribe()

    }

    // file
    startUpload(event: FileList) {
      // The File object
      const file = event.item(0)

      // Client-side validation example
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ')
        return;
      }

      // The storage path
      this.imagepath = `event/${new Date().getTime()}_${file.name}`;
      const path = `event/${new Date().getTime()}_${file.name}`;



      // The main task
      this.task = this.storage.upload(path, file)

      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot   = this.task.snapshotChanges()

      // The file's download URL
      this.task.snapshotChanges().pipe(
          finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
      ).subscribe()

      this.logoUploaded = true;

    }


}
