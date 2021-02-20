import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { DateComponent } from './components/date/date.component';
import { ImageCallerComponent } from './components/image-caller/image-caller.component';
import { InputComponent } from './components/input/input.component';
import { LookupCallerComponent } from './components/lookup-caller/lookup-caller.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { SelectComponent } from './components/select/select.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { MaterialModule } from '../material.module';
import { LookupComponent2 } from './lookup-2/lookup.component';
import { LookupGridComponent2 } from './lookup-2/lookup-grid/grid.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { WindowModule } from '@progress/kendo-angular-dialog';



@NgModule({
  declarations: [
    LookupComponent2,
    LookupGridComponent2,
    FileUploadComponent,

    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    DateTimeComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    LookupCallerComponent,
    ImageCallerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    WindowModule
  ],
  exports: [DynamicFormComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    DateTimeComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    LookupCallerComponent,
    ImageCallerComponent
  ]
})
export class SharedModule { }
