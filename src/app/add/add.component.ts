import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Lookup } from '../models/lookup';
import { DynamicFormComponent } from '../shared/components/dynamic-form/dynamic-form.component';
import { FieldConfig, FormConfig } from '../shared/components/field.interface';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  // @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  lookupFamilyModel: Lookup = {
    title: "Select the Family",
    apiUrl: '/api/FamilyMaintenance',
    key: 'family',
    displayFields: [
      { field: 'name', title: 'Name' },
      { field: 'description', title: 'Description' }
    ],
    returnFields: ['id', 'name', 'description'],
    height: '400',
    width: '450',
    // dataId: this.reasonObj.familyId,
    // textValue: this.reasonObj.familyName,
    labelText: 'Family Name',
    placeholderText: 'Enter Family Name',
  };
  constructor(public dialogRef: MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
  }

  formConfig: FormConfig = { title: 'Form Title' };
  fieldConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Name",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Build Code Required"
        },
        {
          name: "maxlength",
          validator: Validators.maxLength(100),
          message: "Only 100 characters allowed"
        }
      ]
    },
    {
      type: "input",
      label: "Description",
      inputType: "text",
      name: "description",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Build Code Required"
        },
        {
          name: "maxlength",
          validator: Validators.maxLength(100),
          message: "Only 100 characters allowed"
        }
      ]
    },
    {
      type: 'image',
      label: 'imageA',
      name: 'imageA',
      // value: this.orderObj.imageA,

    },
    {
      type: "lookup",
      label: "Family Name",
      name: "lkFamily",
      lookupModel: this.lookupFamilyModel,
    },
    {
      type: "input",
      label: "Order BY",
      inputType: "number",
      name: "orderBy",
      validations: [
        {
          name: "maxlength",
          validator: Validators.maxLength(100),
          message: "Only 100 characters allowed"
        }
      ]
    }];

  // on form submit
  submit(value: any) {
  }
}
