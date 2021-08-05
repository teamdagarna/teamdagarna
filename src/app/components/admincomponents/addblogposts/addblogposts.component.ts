import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Blogpost } from '../../../shared/models';

import Quill from 'quill';

@Component({
  selector: 'app-addblogposts',
  templateUrl: './addblogposts.component.html',
  styleUrls: ['./addblogposts.component.scss']
})



export class AddblogpostsComponent implements OnInit {

addBlogpostsForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  logoUploaded: boolean = false;
  logopath: string;

  //remove?
  isHovering: boolean;

  ngOnInit() {

    this.addBlogpostsForm = this.fb.group({
      'title': ['', [Validators.required]],
      'ingress': ['', []],
      'about': ['', [Validators.required]],
      'priority': ['0', [Validators.required]],
      'date' : ['', [Validators.required]],
    });

  }

  submit(data) {


    const blogpostCollection = this.afs.collection<Blogpost>('news');

    const newBlogpost: Blogpost = {
      title: data.title,
      ingress: data.ingress,
      about: data.about,
      priority: data.priority,
      date: data.date,
      primaryimagepath: this.logopath
      
      

      
      
      
    }

    blogpostCollection.add(newBlogpost).then(() => {
        this.router.navigate(['dreamteamadmin/blogpost'])
    });


  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    this.logopath = `news/${new Date().getTime()}_${file.name}`;
    const path = `news/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
    ).subscribe()

    this.logoUploaded = true;

  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


}

