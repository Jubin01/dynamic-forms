import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Lookup } from 'src/app/models/lookup';
import { FieldConfig, TabConfig } from '../shared/components/field.interface';

@Injectable({
    providedIn: 'root'
})
export class TabbedAddConfigService {
    fieldConfig: FieldConfig[];
    data: any;
    dateFieldConfig: FieldConfig[];
    imageFieldConfig: FieldConfig[];
    lookupFamilyModel: Lookup;
    tabConfig: TabConfig[];
    getConfig = (data: any) => {
        this.dateFieldConfig = [
            {
              type: "datetime",
              label: "Production Start Date Time",
              name: "productionStartDateTime",
             // value: this.orderObj.productionStartDateTime,
            },
            {
              type: "datetime",
              label: "Planned Start Date Time",
              name: "plannedStartDateTime",
            //  value: this.orderObj.plannedDateTime,
            },
            {
              type: "date",
              label: "Start Effective Date",
              name: "startEffectiveDate",
            //  value: this.orderObj.startEffectiveDate,
            }
          ];
          this.imageFieldConfig = [{
            type: 'image',
            label: 'imageA',
            name: 'imageA',
           // value: this.orderObj.imageA,
      
          }, {
            type: 'image',
            name: 'imageB',
            label: 'Image B',
           // value: this.orderObj.imageB,
          }];

        this.tabConfig = [{
            name: "Dates",
            fields: this.dateFieldConfig
          }, {
            name: "Images",
            fields: this.imageFieldConfig
          }];
      
        return this.tabConfig;
    }
}