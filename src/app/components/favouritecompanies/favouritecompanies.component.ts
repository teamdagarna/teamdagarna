import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FavouritecompaniesService } from '../../services/favouritecompanies.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Company } from '../../shared/models';
import * as firebase from 'firebase/app';
import { switchMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-favouritecompanies',
  templateUrl: './favouritecompanies.component.html',
  styleUrls: ['./favouritecompanies.component.scss']
})
export class FavouritecompaniesComponent implements OnInit {

  user;
  favouritecompanies: any;
  companies: any;
  modalCompany: Company;
  isModalActive: boolean = false;
  showSpinner: boolean = true;

  constructor(private readonly afs: AngularFirestore, public auth: AuthService, private favourite: FavouritecompaniesService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.favourite.getFavouriteCompanies(this.user).subscribe(favouritecompanies => {
          this.favouritecompanies = favouritecompanies;
        });
      }
    });
    this.getCompanies().subscribe(companies => {
      this.companies = companies;
      this.showSpinner = false;
    });
  }

  ngOnInit() {}

  getCompanies() {
    return this.afs.collection<Company>('companies').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  checkCompany(companyName: string) {
    const favouritecompanies = this.favouritecompanies;
    if(favouritecompanies) {
      if(favouritecompanies[companyName] != null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  closeModal() {
    this.isModalActive = !this.isModalActive;
  }

  openModal(companyToView) {
    this.isModalActive = !this.isModalActive;
    this.modalCompany = companyToView;
  }

  checkFavourite(company) {
    const user = this.user;
    const companyName = company.name;
    const favouritecompanies = this.favouritecompanies;
    var isFavourite: any;
    if(favouritecompanies) {
      if(favouritecompanies[companyName] != null) {
        isFavourite = favouritecompanies[companyName]
      } else {
        isFavourite = false;
      }
    }
    return isFavourite;
  }

  toggleFavouriteCompany(company) {
    const user = this.user;
    const companyName = company.name;
    const userRef = this.afs.doc(`favouritecompanies/${user.uid}`)
    var isFavourite: any;
    userRef.ref.get().then(doc => {
      if (doc.exists) {
        isFavourite = doc.get(companyName);
        if (isFavourite) {
          this.favourite.unfavourite(user.uid, companyName)
        } else {
          this.favourite.favourite(user.uid, companyName)
        }
      } else {
        this.favourite.favourite(user.uid, companyName)
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }



}
