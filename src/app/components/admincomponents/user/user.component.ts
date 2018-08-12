import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id;

  constructor(private findRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.findRoute.snapshot.params.id;
  }

}
