import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Blogpost } from '../../../shared/models';
import { tap, first } from 'rxjs/operators';
import { switchMap, map} from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  changemode: boolean = false;

  changeBlogpostsForm: FormGroup;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  imagepath: string = '';
  logoUploaded: boolean = false;
  blogposts: any;
  blogpost: any;
  blogpostID: any;

  constructor(public fb: FormBuilder, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.getBlogposts().subscribe(blogpost => {
        this.blogposts = _.orderBy(blogpost, ['priority'], 'desc')
    });
  }



  ngOnInit() {
    this.changeBlogpostsForm = this.fb.group({
      'title': ['', [Validators.required]],
      'primaryimagepath': ['', []],
      'ingress': ['', [Validators.required]],
      'about': ['', [Validators.required]],
      'priority': ['', [Validators.required]],
    });
  }

  preloadData(id) {
    this.afs.doc<Blogpost>(`news/${id}`).valueChanges().pipe(
      tap(data => {
        this.changeBlogpostsForm.patchValue(data)
      })
    ).subscribe();
  }

  startUpload(event: FileList) {
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    const path = `news/${new Date().getTime()}_${file.name}`;
    this.imagepath = path;
    this.task = this.storage.upload(path, file)
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()
    this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
    ).subscribe()
    this.logoUploaded = true;
  }

  getBlogposts() {
    return this.afs.collection<Blogpost>('news').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Blogpost;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  submit(data) {
    try {
      const formValue = this.changeBlogpostsForm.value;
      this.afs.doc(`news/${this.blogpostID}`).update(formValue)
      if (this.imagepath !== '') {
        this.afs.doc(`news/${this.blogpostID}`).update({ primaryimagepath: this.imagepath })
      }
    } catch(err) {
      console.log(err)
    }
    this.changemode = false;
  }

  changeMode(id: any) {
    this.changemode = true;
    this.preloadData(id);
    this.blogpostID = id;
  }

}
