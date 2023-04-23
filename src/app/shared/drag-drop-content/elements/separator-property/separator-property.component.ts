import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-separator-property',
  templateUrl: './separator-property.component.html',
  styleUrls: ['./separator-property.component.scss']
})
export class SeparatorPropertyComponent implements OnInit {
  @Input() component: any;

  constructor() {}

  ngOnInit() {}
}
