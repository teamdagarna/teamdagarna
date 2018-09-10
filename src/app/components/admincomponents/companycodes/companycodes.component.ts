import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';




@Component({
  selector: 'app-companycodes',
  templateUrl: './companycodes.component.html',
  styleUrls: ['./companycodes.component.scss']
})
export class CompanycodesComponent implements OnInit {

  companies: any;
  codes: any;
  company: any;
  loading: boolean = false;

  generateForm: FormGroup;


  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) {
    this.getCompanies().subscribe(companies => {
        this.companies = companies;
    });
    this.getCodes().subscribe(codes => {
        this.codes = codes;
    });
   }

  ngOnInit() {
    this.generateForm = this.fb.group({
      'comp': ['', [Validators.required]]
    });
  }

  getCompanies() {
    return this.afs.collection<Company>('companies', ref => {
      return ref
        .where('offersinterview', '==', true)
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Company;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getCodes() {
    return this.afs.collection('companycodes').valueChanges()
  }

  hasCode(company) {
    if (_.find(this.codes, function(o) { return o.company == company; }) !== undefined) {
    return true;
    } else {
      return false;
    }
  }

  getCompany(company) {
    this.company = _.find(this.companies, { 'id': company });
  }


  async submit(data) {
    // var randomstring = 'test';

    var randomstring = data.comp.substring(0,3) + _.random(1000, 9999);
    this.loading = true;

    const newCode = {
      company: data.comp,
      companyname: this.company.name,
      code: randomstring
    }

    try {
      await this.afs.collection('companycodes').add(newCode);
    } catch(err) {
      console.log(err)
    }
    this.loading = false;
  }

}
