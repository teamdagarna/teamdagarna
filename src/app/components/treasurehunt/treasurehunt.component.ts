import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Company } from '../../shared/models';


@Component({
  selector: 'app-treasurehunt',
  templateUrl: './treasurehunt.component.html',
  styleUrls: ['./treasurehunt.component.scss']
})
export class TreasurehuntComponent implements OnInit {

  companies: any;

  constructor(private readonly afs: AngularFirestore) {
    this.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  ngOnInit() {
  }

  getCompanies() {
    return this.afs.collection<Company>('companies', ref => {
      return ref
        .where('treasurehunt', '==', true);
    }).valueChanges();
  }

}
