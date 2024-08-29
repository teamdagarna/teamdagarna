import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-exsiteccompetition',
  templateUrl: './exsiteccompetition.component.html',
  styleUrls: ['./exsiteccompetition.component.scss']
})
export class exsiteccompetitionComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loadScript();
  }

  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/2636281.js';
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }
}