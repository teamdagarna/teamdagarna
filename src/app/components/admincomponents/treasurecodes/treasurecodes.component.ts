import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-treasurecodes',
  templateUrl: './treasurecodes.component.html',
  styleUrls: ['./treasurecodes.component.scss']
})
export class TreasurecodesComponent implements OnInit {

  treasureCompanies: any;
  treasureCodes: any;
  treasureCompany: any;
  loading: boolean = false;

  treasureGenerateForm: FormGroup;


  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) {
    this.getCompanies().subscribe(companies => {
        this.treasureCompanies = companies;
    });
    this.getTreasureCodes().subscribe(codes => {
        this.treasureCodes = codes;
    });
   }

  ngOnInit() {
    this.treasureGenerateForm = this.fb.group({
      'comp': ['', [Validators.required]]
    });
  }

  getCompanies() {
    return this.afs.collection<Company>('companies', ref => {
      return ref
        .where('treasurehunt', '==', true)
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Company;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getTreasureCodes() {
    return this.afs.collection('treasurecodes').valueChanges()
  }

  hasCode(company) {
    if (_.find(this.treasureCodes, function(o) { return o.company == company; }) !== undefined) {
    return true;
    } else {
      return false;
    }
  }

  getTreasureCompany(company) {
    this.treasureCompany = _.find(this.treasureCompanies, { 'id': company });
  }


  async submit(data) {
    // var randomstring = 'test';

    var randomstring = data.comp.substring(0,3) + _.random(1000, 9999);
    this.loading = true;

    const newCode = {
      company: data.comp,
      companyname: this.treasureCompany.name,
      treasurecode: randomstring
    }

    try {
      await this.afs.collection('treasurecodes').add(newCode);
    } catch(err) {
      console.log(err)
    }
    this.loading = false;
  }

}
