import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../field.interface";
@Component({
  selector: "app-checkbox",
  template: `
<span class="checkbox-style" [formGroup]="group">
<mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
</span>
`,
  styles: [
    `
    .checkbox-style{
    width:24%;
    display: inline-block;
    }
    `
  ]
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
