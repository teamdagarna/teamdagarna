import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weoffer',
  templateUrl: './weoffer.component.html',
  styleUrls: ['./weoffer.component.scss','../../../styles.scss']
})
export class WeofferComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   
  openTab(event: any, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " is-active";
  }

}
