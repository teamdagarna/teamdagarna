import { Component, OnInit } from '@angular/core';
import { switchMap, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

// declare const MapwizeUI;

@Component({
  selector: 'app-fairschedule',
  templateUrl: './fairschedule.component.html',
  styleUrls: ['./fairschedule.component.scss']
})
export class FairscheduleComponent implements OnInit {

  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {
  
  }

}
