import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { FieldConfig, FormConfig, TabConfig } from "../field.interface";

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <div fxLayout="row" class="popup-header-2">
  <div fxFlex="86%">
    <h3 class="popup-header-text">{{formConfig.title}}</h3>
  </div>
  <div class="popup-icon-div">
  <button mat-icon-button matTooltip="Save"><mat-icon>save</mat-icon></button>
  <button mat-icon-button type="button"><mat-icon matTooltip="Maximize" (click)="onMaxxed()">crop_square</mat-icon></button>
  <button mat-icon-button type="button"><mat-icon matTooltip="Minimize" (click)="onMinned()">minimize</mat-icon></button>
  <button mat-icon-button type="button"><mat-icon matTooltip="Close" (click)="onClose()">close</mat-icon></button>
  </div>
</div>
<br/>
  
  <mat-tab-group class="vertical-tabs" *ngIf="tabs.length!==0">
  <ng-container *ngFor="let tab of tabs;">
  
  <mat-tab label="{{tab.name}}" type="submit">
    <section *ngIf="tab.fields" fxLayoutGap="10px">
    <ng-container *ngFor="let field of tab.fields;">
      <ng-container dynamicField [field]="field" [group]="form">
      </ng-container>
    </ng-container>
    </section>

    <section *ngIf="tab.template">
      <ng-container *ngTemplateOutlet="tab.template">
      </ng-container>
    </section>

  </mat-tab>
  
  </ng-container>
  </mat-tab-group>

  <section *ngIf="fields.length!==0" fxLayoutGap="10px">
   <ng-container *ngFor="let field of fields;">
    <ng-container dynamicField [field]="field" [group]="form">
    </ng-container>
   </ng-container>
  </section>

  </form>
  `,
  styles: [
    `
    .popup-header-text{
      padding-top: 8px;
      padding-left: 12px;
    }
  .popup-icon-div{
      min-width: fit-content;
  }

  .dynamic-form{
    padding-top: 4px;
    height: 90%;
  }
    `
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() dialogRef: MatDialogRef<any>;
  @Input() fields: FieldConfig[] = [];
  @Input() tabs: TabConfig[] = [];
  @Input() formConfig: FormConfig = { title: 'default title' };
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dialogRef.updateSize("80vw");
    this.form = this.createControl();
  }

  onMinned = () => {
    this.dialogRef.updateSize("80vw");
  }
  onMaxxed = () => {
    this.dialogRef.updateSize("100vw", "100vh");
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});
    if (this.tabs.length !== 0) {
      this.tabs.forEach(tab => {
        if (tab.fields) {
          tab.fields.forEach(field => {
            if (field.type === "button") return;
            if (field.type === "lookup") return;
            // if (field.type === "image") return;
            if (field.type === "date") {
              field.value = field.value ? field.value.split('T')[0] : field.value;
            }
            if (field.type === "datetime") {
              field.value = field.value ? field.value.slice(0, 19) : field.value;
            }
            const control = this.fb.control(
              field.value,
              this.bindValidations(field.validations || [])
            );
            group.addControl(field.name, control);
          });
        }
      });

    }
    else if (this.fields.length !== 0) {
      this.fields.forEach(field => {
        if (field.type === "button") return;
        if (field.type === "lookup") return;
        // if (field.type === "image") return;
        if (field.type === "date") {
          field.value = field.value ? field.value.split('T')[0] : field.value;
        }
        if (field.type === "datetime") {
          field.value = field.value ? field.value.slice(0, 19) : field.value;
        }
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      });
    }

    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      if (control.status === "INVALID") {
        // const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
        //   width: 'fit-content',
        //   data: { content: [`Error at Field ` + field], alertType: 'error', language: 'en', help: false }
        // });
      }
    });
  }
}
