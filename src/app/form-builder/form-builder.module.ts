import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '@app/shared';
import { GeneratedCodeModalComponent } from './generated-code-modal/generated-code-modal.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,    
    DndModule,
    NgbModule,
    SharedModule,
    ColorPickerModule,
  ],
  providers: [],
  entryComponents: [GeneratedCodeModalComponent],
})
export class FormBuilderModule {}
