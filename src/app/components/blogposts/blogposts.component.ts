import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Blogpost } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs';

import { switchMap, map} from 'rxjs/operators';


@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})



export class BlogpostsComponent implements OnInit {

  user;
  isModalActive: boolean = false;
  modalBlogpost: Blogpost;
  showSpinner: boolean = true;
  orderBy: number = 1;
  blogposts: any;


  constructor(private readonly afs: AngularFirestore, public auth: AuthService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
   
    this.getBlogposts().subscribe(blogposts => {
        this.blogposts = blogposts;
        this.showSpinner = false;
    });
  }

  ngOnInit() {}

  getBlogposts() {
    return this.afs.collection<Blogpost>('news').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Blogpost;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }


  closeModal() {
    this.isModalActive = !this.isModalActive;
  }
  openModal(blogpostToView) {
    this.isModalActive = !this.isModalActive;
    this.modalBlogpost = blogpostToView;
  }

}
