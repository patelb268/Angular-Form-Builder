import { ButtonInterface } from './button.interface';
import { CheckboxInterface } from './checkbox.interface';
import { ComponentSettingInterface } from './component-setting.interface';
import { InputInterface } from './input.interface';
import { MultipleSelectInterface } from './multiple-select.interface';
import { PictureInterface } from './picture.interface';
import { SeparatorInterface } from './separator.interface';
import { SocialIconInterface } from './social-icon.interface';
import { SocialInterface } from './social.interface';
import { SpacerInterface } from './spacer.interface';
import { TextInterface } from './text.interface';
import { UploaderInterface } from './uploader.interface';

export interface ElementInterface {
  id?: string;
  name: string;
  machineName:
    | 'section'
    | 'button'
    | 'input'
    | 'textarea'
    | 'checkbox'
    | 'radios'
    | 'dropdown'
    | 'text'
    | 'picture'
    | 'spacer'
    | 'separator'
    | 'social'
    | 'uploader';
  iconClass?: string;
  image?: string;
  column?: string;
  addedComponents: Array<ElementInterface[]>;
  element?:
    | ButtonInterface
    | CheckboxInterface
    | InputInterface
    | MultipleSelectInterface
    | TextInterface
    | PictureInterface
    | SpacerInterface
    | SeparatorInterface
    | SocialInterface
    | UploaderInterface;
  buttons?: Array<SocialIconInterface>;
  deletable?: boolean;
  type?: 'text' | 'email' | 'number' | 'date' | 'datetime';
  isSelected?: boolean;
  componentSettings?: ComponentSettingInterface;
}
