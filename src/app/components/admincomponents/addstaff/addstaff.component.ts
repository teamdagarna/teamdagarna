import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Dreamteamer } from '../../../shared/models';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss']
})
export class AddstaffComponent implements OnInit {

  addDreamteamerForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  // File upload
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  logopath: string;
  logoUploaded: boolean = false;


  ngOnInit() {
    this.addDreamteamerForm = this.fb.group({
      'fullname': ['', [
        Validators.required
        ]
      ],
      'secondaryimagepath': ['', [
        ]
      ],
      'position': ['', [
        Validators.required
        ]
      ],
      'phone': ['', [
        Validators.required
        ]
      ],
      'mail': ['', [
        Validators.required
        ]
      ],
      'linkedinurl': ['', [
        ]
      ],
      'about': ['', [
        ]
      ],
    });

  }
    get select() {
      let stringToSplit = this.addDreamteamerForm.get('position').value;
      let x = stringToSplit.split(",");
      return x;
    }

//     get position() {
// const con = 1;
// retirn con;
//     }

  submit(data) {
    const dreamteamCollection = this.afs.collection<Dreamteamer>('dreamteam');

    const position = this.select[1];
    const order = +this.select[0];

    const intPhone = data.phone.substr(1).replace('-','').replace(/\s/g, "")
    const next = intPhone.replace(/\s+/g, '')
    const newDreamteamer: Dreamteamer = {
      fullname: data.fullname,
      primaryimagepath: this.logopath,
      secondaryimagepath: data.secondaryimagepath,
      position: position,
      linkedinurl: data.linkedinurl,
      about: data.about,
      ordertoshow: order,
      phone: data.phone,
      internationalphone: intPhone,
      mail: data.mail
    }

    dreamteamCollection.add(newDreamteamer).then(() => {
        this.router.navigate(['dreamteamadmin'])
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
    this.logopath = `dreamteam/${new Date().getTime()}_${file.name}`;
    const path = `dreamteam/${new Date().getTime()}_${file.name}`;

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
