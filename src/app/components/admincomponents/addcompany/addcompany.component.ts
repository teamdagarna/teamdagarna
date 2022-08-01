import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Company } from '../../../shared/models';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss']
})
export class AddcompanyComponent implements OnInit {

  addCompanyForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  // File upload
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  logopath: string;
  logoUploaded: boolean = false;

  //remove?
  isHovering: boolean;

  offersinterview: boolean = false;

  ngOnInit() {


    this.addCompanyForm = this.fb.group({
      'companyName': ['', [
        Validators.required
        ]
      ],
      'industry': [false, [
        // Validators.required
        ]
      ],
      'consulting': [false, [
      ]
    ],
    'industri': [false, [
       ]
      ],
      'logistik': [false, [
        ]
      ],
      'itteknik': [false, [
        ]
      ],
      'rekrytering': [false, [
       ]
      ],
     'bank': [false, [
      ]
     ],
     'retail': [false, [
       ]
     ],
     'fastigheter': [false, [
       ]
     ],
     'forening': [false, [
      ]
     ],
      'telekom': [false, [
       ]
      ],
     'revision': [false, [
     ]
     ],
     'startup': [false, [
      ]
     ],
     'other': [false, [
       ]
      ],
      'internship': [false, [
        ]
      ],
      'masterthesis': [false, [
        ]
      ],
      'otherthesis': [false, [
        ]
      ],
      'parttime': [false, [
        ]
      ],
      'fulltime': [false, [
        ]
      ],
      'trainee': [false, [
        ]
      ],
      'summerjob': [false, [
        ]
      ],
      'abroad': [false, [
        ]
      ],
      'engineers': [false, [
        ]
      ],
      'filfakare': [false, [
        ]
      ],
      'firstyear': [false, [
        ]
      ],
      'secondyear': [false, [
        ]
      ],
      'thirdyear': [false, [
        ]
      ],
      'fourthyear': [false, [
        ]
      ],
      'fifthyear': [false, [
        ]
      ],

      'digitalMan': [true, [
      ]
     ],
     'finans': [true, [
    ]
   ],
   'industriellmarknad': [true, [
  ]
 ],
 'kvalitetVerksam': [true, [
]
],
'logistikMaster': [true, [
]
],
'projektInno': [true, [
]
],
'produktionsledning': [true, [
]
],
'strategiStyrning': [true, [
]
],
'systemteknik': [true, [
]
],
'maskinteknik': [true, [
]
],
'bioteknik': [true, [
]
],
'datateknik': [true, [
]
],
'energiteknik': [true, [
]
],
'redovisning': [true, [
]
],
'ekonomistyrning': [true, [
]
],
'strategiMarknad': [true, [
]
],
'finansiellekonomi': [true, [
]
],
'nationalekonomi': [true, [
]
],
'ekonomiskanalys': [true, [
]
],


      'about': ['', [
        Validators.required
        ]
      ],
      'values': ['', [
        ]
      ],
      'firstdayappearance': [false, [
        ]
      ],
      'seconddayappearance': [false, [
        ]
      ],
      'firstdaypackage1': [false, [
        ]
      ],
      'firstdaypackage2': [false, [
        ]
      ],
      'seconddaypackage1': [false, [
        ]
      ],
      'seconddaypackage2': [false, [
        ]
      ],
      'treasurehunt': [false, [
        ]
      ],
      'treasurehuntTuesday': [false, [
        ]
      ],
      'treasurehuntWednesday': [false, [
        ]
      ],
      'pitchLecture': [false, [
        ]
      ],
      'preTEAM': [false, [
        ]
      ],
      'startUpZone': [false, [
        ]
      ],
      'climateComp': [false, [
        ]
      ],
      'interviewinfo': ['', [
        ]
      ],
      'reqcl': [false, [
        ]
      ],
      'reqgrades': [false, [
        ]
      ],
      'reqresume': [false, [
        ]
      ],
      'linkedIn': ['', [
        ]
      ],
      'instagram': ['', [
        ]
      ],
      'twitter': ['', [
        ]
      ],
      'facebook': ['', [
        ]
      ],
      'hemsida': ['', [
        Validators.required
        ]
      ], 
      'placeID': ['', [
        ]
      ],
    });

  }

  // get companyName() { return this.addCompanyForm.get('companyName') }
  // get industry() { return this.addCompanyForm.get('industry') }


  submit(data) {
    if (data.firstdaypackage1 || data.firstdaypackage2 || data.seconddaypackage1 || data.seconddaypackage2) {
      this.offersinterview = true;
    }

    const companiesCollection = this.afs.collection<Company>('companies');

    const newCompany: Company = {
      name: data.companyName,

      industry: data.industry,
      consulting: data.consulting,
      industri: data.industri,
      logistik: data.logistik,
      itteknik: data.itteknik,
      rekrytering: data.rekrytering,
      bank: data.bank,
      retail: data.retail,
      fastigheter: data.fastigheter,
      forening: data.forening,
      telekom: data.telekom,
      revision: data.revision,
      startup: data.startup,
      other: data.other,

      internship: data.internship,
      masterthesis: data.masterthesis,
      otherthesis: data.otherthesis,
      parttime: data.parttime,
      fulltime: data.fulltime,
      trainee: data.trainee,
      summerjob: data.summerjob,
      abroad: data.abroad,

      engineers: data.engineers,
      filfakare: data.filfakare,

      digitalMan: data.digitalMan,
      finans: data.finans,
      industriellmarknad: data.industriellmarknad,
      kvalitetVerksam: data.kvalitetVerksam,
      logistikMaster: data.logistikMaster,
      projektInno: data.projektInno,
      produktionsledning: data.produktionsledning,
      strategiStyrning: data.strategiStyrning,
      systemteknik: data.systemteknik,
      maskinteknik: data.maskinteknik,
      bioteknik: data.bioteknik,
      datateknik: data.datateknik,
      energiteknik: data.energiteknik,
      redovisning: data.redovisning,
      ekonomistyrning: data.ekonomistyrning,
      strategiMarknad: data.strategiMarknad,
      finansiellekonomi: data.finansiellekonomi,
      nationalekonomi: data.nationalekonomi,
      ekonomiskanalys: data.ekonomiskanalys,

      firstyear: data.firstyear,
      secondyear: data.secondyear,
      thirdyear: data.thirdyear,
      fourthyear: data.fourthyear,
      fifthyear: data.fifthyear,

      preTEAM: data.preTEAM,
      firstdayappearance: data.firstdayappearance,
      seconddayappearance: data.seconddayappearance,
      interviewpackages: {
        firstdaypackage1: data.firstdaypackage1,
        firstdaypackage2: data.firstdaypackage2,
        seconddaypackage1: data.seconddaypackage1,
        seconddaypackage2: data.seconddaypackage2
      },
      treasurehunt: data.treasurehunt,
      treasurehuntTuesday: data.treasurehuntTuesday,
      treasurehuntWednesday: data.treasurehuntWednesday,
      pitchLecture: data.pitchLecture,
      startUpZone: data.startUpZone,
      climateComp: data.climateComp,

      about: data.about,
      values: data.values,

      logopath: this.logopath,
      offersinterview: this.offersinterview,
      reqresume: data.reqresume,
      reqcl: data.reqcl,
      reqgrades: data.reqgrades,
      interviewinfo: data.interviewinfo,
      linkedIn: data.linkedIn,
      instagram: data.instagram,
      twitter: data.twitter,
      hemsida: data.hemsida,
      facebook: data.facebook,
      placeID: data.placeID
    }

    companiesCollection.add(newCompany).then(() => {
        this.router.navigate(['dreamteamadmin/companies'])
    });


  }



  // file
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    this.logopath = `companylogos/${new Date().getTime()}_${file.name}`;
    const path = `companylogos/${new Date().getTime()}_${file.name}`;

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
