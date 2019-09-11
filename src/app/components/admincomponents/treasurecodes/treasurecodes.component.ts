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

  treasureCompaniesTuesday: any;
  treasureCompaniesWednesday: any;
  treasureCodesTuesday: any;
  treasureCodesWednesday: any;
  treasureCompanyTuesday: any;
  treasureCompanyWednesday: any;
  loading1: boolean = false;
  loading2: boolean = false;

  treasureGenerateFormTuesday: FormGroup;
  treasureGenerateFormWednesday: FormGroup;


  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) {
    this.getCompaniesTuesday().subscribe(companies => {
        this.treasureCompaniesTuesday = companies;
    });

    this.getCompaniesWednesday().subscribe(companies => {
        this.treasureCompaniesWednesday = companies;
    });

    this.getTreasureCodesTuesday().subscribe(codes => {
        this.treasureCodesTuesday = codes;
    });

    this.getTreasureCodesWednesday().subscribe(codes => {
        this.treasureCodesWednesday = codes;
    });
   }

  ngOnInit() {
    this.treasureGenerateFormTuesday = this.fb.group({
      'comp': ['', [Validators.required]]
    });
    this.treasureGenerateFormWednesday = this.fb.group({
      'comp': ['', [Validators.required]]
    });
  }

  getCompaniesTuesday() {
    return this.afs.collection<Company>('companies', ref => {
      return ref
        .where('treasurehuntTuesday', '==', true)
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Company;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getCompaniesWednesday() {
    return this.afs.collection<Company>('companies', ref => {
      return ref
      .where('treasurehuntWednesday', '==', true)
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getTreasureCodesTuesday() {
    return this.afs.collection('treasurecodesTuesday').valueChanges()
  }

  getTreasureCodesWednesday() {
    return this.afs.collection('treasurecodesWednesday').valueChanges()
  }


  hasCodeTuesday(company) {
    if (_.find(this.treasureCodesTuesday, function(o) { return o.company == company; }) !== undefined) {
    return true;
    } else {
      return false;
    }
  }


  hasCodeWednesday(company) {
    if (_.find(this.treasureCodesWednesday, function(o) { return o.company == company; }) !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  getTreasureCompanyTuesday(company) {
    this.treasureCompanyTuesday = _.find(this.treasureCompaniesTuesday, { 'id': company });
  }

  getTreasureCompanyWednesday(company) {
    this.treasureCompanyWednesday = _.find(this.treasureCompaniesWednesday, { 'id': company });
  }


  async submitTuesday(data) {
    // var randomstring = 'test';

    var randomstring = data.comp.substring(0,3) + _.random(1000, 9999);
    this.loading1 = true;

    const newCode = {
      company: data.comp,
      companyname: this.treasureCompanyTuesday.name,
      treasurecode: randomstring
    }

    try {
      await this.afs.collection('treasurecodesTuesday').add(newCode);
    } catch(err) {
      console.log(err)
    }
    this.loading1 = false;
  }

  async submitWednesday(data) {
    // var randomstring = 'test';

    var randomstring = data.comp.substring(0,3) + _.random(1000, 9999);
    this.loading2 = true;

    const newCode = {
      company: data.comp,
      companyname: this.treasureCompanyWednesday.name,
      treasurecode: randomstring
    }

    try {
      await this.afs.collection('treasurecodesWednesday').add(newCode);
    } catch(err) {
      console.log(err)
    }
    this.loading2 = false;
  }

}
