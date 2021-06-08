import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @HostBinding('className') className = 'position-absolute w-100';

  isExpanded = false;

  constructor() {}

  ngOnInit(): void {}
}
