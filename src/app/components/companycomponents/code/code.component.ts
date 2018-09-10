import { Component, OnInit } from '@angular/core';
import { Company, Code } from '../../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

    submitCodeForm: FormGroup;
    code;
    loading: boolean = false;

    constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) { }

    ngOnInit() {
      this.submitCodeForm = this.fb.group({
        'code': ['', [Validators.required]]
      });
    }

    getCompany(code) {
      return this.afs.collection('companycodes', ref => {
        return ref
          .where('code', '==', code)
          .limit(1);
      }).valueChanges()
    }

    async submit(data) {
      try {
        this.getCompany(data.code).subscribe(code => {
            this.code = code[0];
            console.log(this.code.companyname)
        });
      } catch(err) {
        console.log('err')
      }

      this.loading = false;
    }

  }
