import { Component, Inject, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormComponent } from '../shared/components/dynamic-form/dynamic-form.component';
import { FieldConfig, FormConfig } from '../shared/components/field.interface';
import { AddConfigService } from './add-config.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
fieldConfig: FieldConfig[]; 
  
  constructor(public dialogRef: MatDialogRef<AddComponent>,private addConfigService: AddConfigService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.fieldConfig = this.addConfigService.getConfig(this.data);
  }

  formConfig: FormConfig = { title: 'Form Title' };

  // on form submit
  submit(value: any) {
  }
}
