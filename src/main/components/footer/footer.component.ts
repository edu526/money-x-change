import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mxc-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  footer = [1, 2, 3];
  constructor() { }

  ngOnInit(): void {
  }

}
