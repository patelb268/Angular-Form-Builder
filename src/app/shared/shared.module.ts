import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ngx-drag-drop';
import { CKEditorModule } from 'ngx-ckeditor';
import { ColorPickerModule } from 'ngx-color-picker';
import { TranslateModule } from '@ngx-translate/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FontOptionsComponent } from './font-options/font-options.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { TextComponent } from './drag-drop-content/elements/text/text.component';
import { SeparatorComponent } from './drag-drop-content/elements/separator/separator.component';
import { ButtonComponent } from './drag-drop-content/elements/button/button.component';
import { PictureComponent } from './drag-drop-content/elements/picture/picture.component';
import { SocialComponent } from './drag-drop-content/elements/social/social.component';
import { CurrentElementComponent } from './drag-drop-content/elements/current-element/current-element.component';
import { TextPropertyComponent } from './drag-drop-content/elements/text-property/text-property.component';
import { PicturePropertyComponent } from './drag-drop-content/elements/picture-property/picture-property.component';
import { ButtonPropertyComponent } from './drag-drop-content/elements/button-property/button-property.component';
import { SeparatorPropertyComponent } from './drag-drop-content/elements/separator-property/separator-property.component';
import { SocialPropertyComponent } from './drag-drop-content/elements/social-property/social-property.component';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { PreviewHtmlComponent } from './preview-html/preview-html.component';

import { CheckboxComponent } from './drag-drop-content/elements/checkbox/checkbox.component';
import { CheckboxPropertyComponent } from './drag-drop-content/elements/checkbox-property/checkbox-property.component';
import { RadiosComponent } from './drag-drop-content/elements/radios/radios.component';
import { DropdownComponent } from './drag-drop-content/elements/dropdown/dropdown.component';
import { InputComponent } from './drag-drop-content/elements/input/input.component';
import { TextareaComponent } from './drag-drop-content/elements/textarea/textarea.component';
import { SpacerComponent } from './drag-drop-content/elements/spacer/spacer.component';
import { SpacerPropertyComponent } from './drag-drop-content/elements/spacer-property/spacer-property.component';
import { TextareaPropertyComponent } from './drag-drop-content/elements/textarea-property/textarea-property.component';
import { RadiosPropertyComponent } from './drag-drop-content//elements/radios-property/radios-property.component';
import { DropdownPropertyComponent } from './drag-drop-content/elements/dropdown-property/dropdown-property.component';
import { InputPropertyComponent } from './drag-drop-content/elements/input-property/input-property.component';
import { FormDesignPropertyComponent } from './drag-drop-content/elements/form-design-property/form-design-property.component';
import { I18nService } from './i18n.service';
import { UploaderComponent } from './drag-drop-content/elements/uploader/uploader.component';
import { UploaderPropertyComponent } from './drag-drop-content/elements/uploader-property/uploader-property.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DndModule,
    CKEditorModule,
    ColorPickerModule,
    TranslateModule.forChild(),
    DropzoneModule,
  ],
  exports: [
    SafeHtmlPipe,
    FontOptionsComponent,
    TextComponent,
    SeparatorComponent,
    ButtonComponent,
    PictureComponent,
    SocialComponent,
    CurrentElementComponent,
    TextPropertyComponent,
    PicturePropertyComponent,
    ButtonPropertyComponent,
    SeparatorPropertyComponent,
    SocialPropertyComponent,
    HtmlEditorComponent,
    CheckboxComponent,
    CheckboxPropertyComponent,
    RadiosComponent,
    DropdownComponent,
    InputComponent,
    TextareaComponent,
    SpacerComponent,
    SpacerPropertyComponent,
    TextareaPropertyComponent,
    RadiosPropertyComponent,
    DropdownPropertyComponent,
    InputPropertyComponent,
    FormDesignPropertyComponent,
    UploaderComponent,
    UploaderPropertyComponent,
  ],
  declarations: [
    SafeHtmlPipe,
    FontOptionsComponent,
    ConfirmationModalComponent,
    TextComponent,
    SeparatorComponent,
    ButtonComponent,
    PictureComponent,
    SocialComponent,
    CurrentElementComponent,
    TextPropertyComponent,
    PicturePropertyComponent,
    ButtonPropertyComponent,
    SeparatorPropertyComponent,
    SocialPropertyComponent,
    HtmlEditorComponent,
    PreviewHtmlComponent,
    CheckboxComponent,
    CheckboxPropertyComponent,
    RadiosComponent,
    DropdownComponent,
    InputComponent,
    TextareaComponent,
    SpacerComponent,
    SpacerPropertyComponent,
    TextareaPropertyComponent,
    RadiosPropertyComponent,
    DropdownPropertyComponent,
    InputPropertyComponent,
    FormDesignPropertyComponent,
    UploaderComponent,
    UploaderPropertyComponent,
  ],
  entryComponents: [ConfirmationModalComponent],
  providers: [I18nService],
})
export class SharedModule {}
