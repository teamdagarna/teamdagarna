import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('fade',
    [
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.countdown()
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 0) {
       let element = document.getElementById('navbar');
       element.classList.add('sticky');
       element.classList.remove('fixed');
     } else {
      let element = document.getElementById('navbar');
        element.classList.remove('sticky');
        element.classList.add('fixed');
     }
  }


  countdown() {
    var countDownDate = new Date("Sep 24, 2019 09:00:00").getTime();



      // Update the count down every 1 second
      var x = setInterval(function() {

        // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date

      if ((countDownDate - now) < 0) {
        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
      } else {
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
      // Display the result in the element with id="demo"
      document.getElementById("theEndIsNear").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

}
