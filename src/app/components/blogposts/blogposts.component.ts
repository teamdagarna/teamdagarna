import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Blogpost } from '../../shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit {
  isModalActive: boolean = false;
  modalBlogpost: Blogpost;


  private blogpostCollection: AngularFirestoreCollection<Blogpost>;
  blogposts: Observable<Blogpost[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.blogpostCollection = afs.collection<Blogpost>('news', ref => ref.orderBy('priority', 'desc'));
    this.blogposts = this.blogpostCollection.valueChanges();
  }

  ngOnInit() {
  }

  closeModal() {
    this.isModalActive = !this.isModalActive;
  }
  openModal(blogpostToView) {
    this.isModalActive = !this.isModalActive;
    this.modalBlogpost = blogpostToView;
  }

}
