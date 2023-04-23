import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';
import socialIcons from './social-icons';

@Component({
  selector: 'app-social-property',
  templateUrl: './social-property.component.html',
  styleUrls: ['./social-property.component.scss']
})
export class SocialPropertyComponent implements OnInit {
  @Input() component: any;

  public socialNetworks = socialIcons;

  constructor() {}

  ngOnInit() {
    
  }

  addButton() {
    this.component.buttons.push({
      id: UUID.UUID(),
      name: 'Facebook',
      icon: 'fab fa-facebook-square',
      img_link: this.socialNetworks[0].img_link,
      link_to: ''
    });
  }

  setButton(social: any, data: any) {
    social.name = data.name;
    social.icon = data.icon;
    social.img_link = data.img_link;
  }

  deleteButton(id: string) {
    this.component.buttons = this.component.buttons.filter((item: any) => item.id !== id);
  }
}
