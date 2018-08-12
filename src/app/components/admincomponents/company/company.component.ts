import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  id;

  constructor(private findRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.findRoute.snapshot.params.id;
  }

}
