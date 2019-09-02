import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'mxc-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {

  @HostBinding('class') class = 'g-layout';

  constructor() { }

  ngOnInit(): void {
  }

}
