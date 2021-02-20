import { FilterDescriptor } from "@progress/kendo-data-query";
import { FormGroup } from "@angular/forms";

export interface Lookup {
  gridId?: string;
  key?: string;
  dataId?: any;
  apiUrl?: string;
  displayFields?: any;
  returnFields?: string[];
  title?: string;
  filterable?: boolean;
  resizeable?: boolean;
  height?: string;
  width?: string;
  filter?: FilterDescriptor[];
  textValue?: any;
  labelText?: string;
  placeholderText?: string;
  topMargin?: string;
  leftMargin?: string;
  isRequired?: boolean;
  form?: FormGroup;
  rowSelectCallback?: any;
  lookupClearCallback?: any;
  isDisable?: boolean;
  partOfNewSharedForm?: string;
}