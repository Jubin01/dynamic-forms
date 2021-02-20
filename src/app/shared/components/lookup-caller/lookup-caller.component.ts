import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-lookup-caller',
  template: `

  <app-lookup-2 #{{field.name}} [lookupModel]="field.lookupModel">
  </app-lookup-2>

`,
  styles: []
})
export class LookupCallerComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit() {
     this.field.lookupModel.partOfNewSharedForm = 'yesItIs';
     this.field.lookupModel.form = this.group;
  }

}
