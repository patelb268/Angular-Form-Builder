import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-picture-property',
  templateUrl: './picture-property.component.html',
  styleUrls: ['./picture-property.component.scss']
})
export class PicturePropertyComponent implements OnInit {
  @Input() component: any;

  constructor(
    
  ) {}
  errors: Array<any> = [];

  ngOnInit() {}

  public handleInputChange(e: any) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('Invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    this.component.element.image_url = e.target.result;    
  }
}
