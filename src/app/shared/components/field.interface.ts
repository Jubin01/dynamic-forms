import { TemplateRef } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Lookup } from "src/app/models/lookup";
//import { Lookup } from "../../models/lookup";

export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FormConfig {
  title: string;
  // fieldConfigs: FieldConfig[];
}

export interface TabConfig {
  name: string;
  fields?: FieldConfig[];
  template?: TemplateRef<HTMLElement>;
}
// export interface TemplateConfig {
//   template: TemplateRef<HTMLElement>;
// }

export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  lookupModel?: Lookup;
  styleClass?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
}
