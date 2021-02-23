import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Lookup } from 'src/app/models/lookup';
import { FieldConfig } from '../shared/components/field.interface';

@Injectable({
    providedIn: 'root'
})
export class AddConfigService {
    fieldConfig: FieldConfig[];
    data: any;
    lookupFamilyModel: Lookup;
    getConfig = (data: any) => {

        this.lookupFamilyModel = {
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

        this.fieldConfig = [
            {
                type: "input",
                label: "Name",
                inputType: "text",
                name: "name",
              //  value: this.reasonObj.name,
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
              //  value: this.reasonObj.description,
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
            }, {
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
               // value: this.reasonObj.orderBy,
                validations: [
                    {
                        name: "maxlength",
                        validator: Validators.maxLength(100),
                        message: "Only 100 characters allowed"
                    }
                ]
            }];
        return this.fieldConfig;
    }
}