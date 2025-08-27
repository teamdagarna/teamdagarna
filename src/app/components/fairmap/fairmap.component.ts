import { Component, OnInit } from '@angular/core';
import { switchMap, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

// declare const MapwizeUI;

@Component({
  selector: 'app-fairmap',
  templateUrl: './fairmap.component.html',
  styleUrls: ['./fairmap.component.scss']
})
export class FairMapComponent implements OnInit {

  preselected: string;

  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.preselected = params['preselected'];
      });
      if(this.preselected) {
        var options = {
          apiKey: '097038a6cd6e6db054f6ff5eefeb583d',
          centerOnPlace: this.preselected
        }
        // MapwizeUI.map(options).then(map => {
        //   console.log('Mapwize map and ui are ready to be used')
        // })
      } else {
        var options2 = {
          apiKey: '097038a6cd6e6db054f6ff5eefeb583d',
          centerOnVenue: '5d42badd6b2246002cb277cf'
        }
        // MapwizeUI.map(options2).then(map => {
        //   console.log('Mapwize map and ui are ready to be used')
        // })
      }
  }

}
