//service not used as variable values get overwritten.

import { Subject} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LookupService {

  validate: Subject<any> = new Subject();

  lookupDataId: any;
  lookupDataName: any;
  textBoxValue: any;
  apiUrl: any;
  constructor() {
  }

  //sets the text controls value in a variable, which is used for validation
  setTextBoxValue = (key, value) => {
    this.textBoxValue = value;
    if (this.textBoxValue !== "") {
      if (this.textBoxValue !== this.lookupDataName) {
        this.validate.next({ key: key, status: 'invalid' });
      }
    }
  }

  // sets the lookup record Name in variable 
  setLookupDataName = (name: any) => {
    this.lookupDataName = name;
  }

  //sets lookup data id
  setLookupDataId = (id: any) => {
    this.lookupDataId = id;
  }

  // used to get data id, after validations
  getLookupDataId(key: string){

    // if (key === this.key) {
     if (this.textBoxValue === this.lookupDataName) {
       return this.lookupDataId;
     }
     else {

     this.validate.next({ key: key, status: 'invalid' });
     }
    // this.dataService.fetchAllData([{ field: 'name', value: (this.textBoxValue === null || this.textBoxValue === undefined || this.textBoxValue === '') ? '' : this.textBoxValue, operator: 'eq' }],
    //   this.apiUrl)
    //   .subscribe((res: any) => {
    //     if (res.data.length > 0) {
    //       return res.data[0].id;
    //     }
    //     else {
    //           return 'invalid value';
    //     }
    //   },
    //     err => {
    //       console.log(err);
    //       //  return this.lookupDataId;
    //     });
    //   }
    // }

  }

  getLookupDataName = () => {
    return this.lookupDataName;
  }
}
