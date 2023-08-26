import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { FavouritecompaniesService } from 'src/app/services/favouritecompanies.service';
import { Company } from 'src/app/shared/models';


@Component({
  selector: 'app-goldpieces',
  templateUrl: './goldpieces.component.html',
  styleUrls: ['./goldpieces.component.scss']
})

export class GoldpiecesComponent implements OnInit {

/*  
  user;
  favouritecompanies: any;
  isFavourite: boolean;
  isModalActive: boolean = false;
  isModal2Active: boolean = false;
  showFilters: boolean = false;
  modalCompany: Company;
  showSpinner: boolean = true;
  orderBy: number = 1;
  filters = {}
  companies: any;
  filteredCompanies: any;
  searchValue: string= "";
  searchInput: string="";

  constructor(private readonly afs: AngularFirestore, public auth: AuthService, private favourite: FavouritecompaniesService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.favourite.getFavouriteCompanies(this.user).subscribe(favouritecompanies => {
          this.favouritecompanies = favouritecompanies;
        });
      }
    });
    // this.companies = this.companiesCollection.valueChanges();
    this.getCompanies().subscribe(companies => {
        this.companies = companies;
        this.showSpinner = false;
    });
  } */

  ngOnInit() {}
/*  
  getCompanies() {
    return this.afs.collection<Company>('companies').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Company;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
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
    if(favouritecompanies) {
      if(favouritecompanies[companyName] != null) {
        this.isFavourite = favouritecompanies[companyName]
      } else {
        this.isFavourite = false;
      }
    } else {
      this.isFavourite = false;
    }
    return this.isFavourite;
  }

  toggleFavouriteCompany(company) {
    const user = this.user;
    const companyName = company.name;
      if (this.checkFavourite(company)) {
        this.favourite.unfavourite(user.uid, companyName)
      } else {
        this.favourite.favourite(user.uid, companyName)
      }
  }*/

  

}
