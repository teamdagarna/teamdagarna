import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  _trialEndsAt;
  diff;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor() {}

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;
    return [
      days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }

  ngOnInit() {
    this._trialEndsAt = new Date("Sep 22, 2020 09:00:00").getTime();

    interval(1000).pipe(
      map((x) => {this.diff = this._trialEndsAt - new Date().getTime();
      })).subscribe((x) => {
        this.days = this.getDays(this.diff);
        this.hours = this.getHours(this.diff);
        this.minutes = this.getMinutes(this.diff);
        this.seconds = this.getSeconds(this.diff);
      });
    }

    getDays(t) {
      return Math.floor( t / (1000 * 60 * 60 * 24) );
    }

    getHours(t) {
      return Math.floor( (t / (1000 * 60 * 60)) % 24 );
    }

    getMinutes(t) {
      return Math.floor( (t / 1000 / 60) % 60 );
    }

    getSeconds(t) {
      return Math.floor( (t / 1000) % 60 );
    }

  }
