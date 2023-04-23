import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-current-element',
  templateUrl: './current-element.component.html',
  styleUrls: ['./current-element.component.scss']
})
export class CurrentElementComponent implements OnInit {
  @Input() selectedComponent: any;

  constructor(public vcRef: ViewContainerRef) {}

  ngOnInit() {}
}
