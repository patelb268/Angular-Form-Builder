import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @Input() component: any;
  @Input() formDesign: any;

  constructor() {}

  ngOnInit(): void {}
}
