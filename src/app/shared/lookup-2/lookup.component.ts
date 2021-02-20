import { Component, Input, OnInit, HostListener, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { LookupGridDataService2 } from './lookup-grid/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Lookup } from 'src/app/models/lookup';

@Component({
    selector: 'app-lookup-2',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.scss']
})

export class LookupComponent2 implements OnInit, OnDestroy {
    @ViewChild('textInput') textInput: ElementRef;

    validate: Subject<any> = new Subject();
    selectedLookupData: any;
    opened: boolean;
    @Input() lookupModel: Lookup;
    labelText: string;
    key: string;
    placeholderText: string;
    textValue: string;
    dataId: any;
    filter: { field: string; value: any; operator: string; }[];
    form: FormGroup;
    statusSub: Subscription;
    dataName: string;
//    public settings: Settings;
    //typingTimer: NodeJS.Timeout;
    isDisable: boolean;
    lookupWidth: string;
    constructor(private dialog: MatDialog, private dataService: LookupGridDataService2) {
       // this.settings = this.appSettings.settings;

        // used for validating typed text
        this.statusSub = this.validate.subscribe((status) => {
            if (status === 'invalid') {
                this.form.controls[this.key].setErrors({ 'incorrect': true });
            }
        });
    }

    // esc event handling
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    }

    ngOnDestroy() {
        this.statusSub.unsubscribe();
    }

    // retrieves lookup current record id
    getDataId(key) {
        if (this.key === key) {
            return this.dataId;
        }
    }

    // retrieves lookup current record name
    getDataName(key) {
        if (this.key === key) {
            return this.dataName;
        }
    }

    // sets the lookup row data id
    setLookupDataId = (dataId) => {
        this.dataId = dataId;
    }

    // sets the lookup row data name
    setLookupDataName = (dataName) => {
        this.textValue = dataName;
        this.dataName = dataName;
        if (this.lookupModel.rowSelectCallback) {
            this.lookupModel.rowSelectCallback(this.dataId);
        }
        //  this.form.controls[this.key].setValue(dataName);
    }
    // set the lookup disable
    setLookupDisable = (flag) => {
        this.isDisable = flag;
    }
    ngOnInit() {
        this.lookupWidth = this.lookupModel.width == undefined ? '350' : this.lookupModel.width;
        this.key = this.lookupModel.key;
        this.setLookupDataId(this.lookupModel.dataId);
        this.setLookupDataName(this.lookupModel.textValue);
        this.form = this.lookupModel.form;

        // disable lookup
        this.isDisable = this.lookupModel.isDisable == true ? true : false;
        this.form.addControl(this.key + 'Id', new FormControl());
        this.form.controls[this.key + 'Id'].setValue(this.dataId);
        if (this.lookupModel.isRequired === true) {
            this.form.addControl(this.key, new FormControl({ value: this.textValue, disabled: this.isDisable }, Validators.required));
        }
        else {
            this.form.addControl(this.key, new FormControl({ value: this.textValue, disabled: this.isDisable }));
        }

        this.labelText = this.lookupModel.labelText;
        this.placeholderText = this.lookupModel.placeholderText;

        // disabling lookup button 
        if (this.lookupModel.isDisable == true) {
            this.isDisable = true;
        }
    }

    // executed on lookup closed
    public onClose = (): void => {
        this.opened = false;
    }

    // disable lookup
    public disable = (e): void => {

    }

    // open the lookup window
    public open = (evt: MouseEvent): void => {
        evt.stopPropagation();
        //  this.textInput.nativeElement.blur();
        // setTimeout(() => {
        //    this.textInput.nativeElement.blur();
        this.opened = true;
        // }, 1000);
        this.filter = [{ field: this.lookupModel.displayFields[0].field, value: (this.textValue === null || this.textValue === undefined || this.textValue === '') ? '' : this.textValue, operator: 'contains' }];
    }

    // on text enter in textbox control
    public onKeyUp = (event) => {
        if (event.target.value === "") {
            this.setLookupDataId(null);
            this.setLookupDataName(null);
        }

      //  clearTimeout(this.typingTimer);

        // this.typingTimer = setTimeout(() => {
        //     this.textValue = event.target.value;
        //     this.filter = [{ field: this.lookupModel.displayFields[0].field, value: event.target.value, operator: 'contains' }];
        //     if (event.target.value !== "") {
        //         this.validateValue((res) => {
        //             this.setLookupDataId(res.id);
        //             this.setLookupDataName(res[this.lookupModel.displayFields[0].field]);
        //             //   this.textInput.nativeElement.focus();
        //         });
        //     }
        // }, 1000);
    }

    //validate typed text value
    public validateValue = (callback) => {
        if (this.textValue !== "") {
            this.textInput.nativeElement.blur();
            // this.settings.loadingSpinner = {
            //     show: true,
            //     text: 'Searching'
            // };
            this.dataService.fetchAllData([{ field: this.lookupModel.displayFields[0].field, value: (this.textValue === null || this.textValue === undefined || this.textValue === '') ? '' : this.textValue, operator: 'eq' }],
                this.lookupModel.apiUrl)
                .subscribe((res: any) => {
                  //  this.settings.loadingSpinner.show = false;
                    if (res.data.length === 1) {
                        callback(res.data[0]);
                    }
                    else {
                        this.textInput.nativeElement.blur();
                        this.opened = true;
                        this.validate.next('invalid');
                    }
                }, err => {
                  //  this.settings.loadingSpinner.show = false;
                    // const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
                    //     width: 'fit-content',
                    //     data: { content: err.error, alertType: 'error', language: 'en', help: false }
                    // });
                });
        }
    }

    //on clearing the lookup control
    public lookupClear = () => {
        this.form.controls[this.key].reset();
        this.setLookupDataId(null);
        this.setLookupDataName(null);
        if (this.lookupModel.lookupClearCallback) {
            this.lookupModel.lookupClearCallback();
        }
    }

    //on lookup grid Row data click
    onRowClick = (selectedData: any): void => {
        this.selectedLookupData = selectedData;
    }

    //on clickin the lookup check mark
    onOkClick = () => {
        this.setLookupDataId(this.selectedLookupData.id);
        this.setLookupDataName(this.selectedLookupData[this.lookupModel.displayFields[0].field]);
        this.form.controls[this.key].setValue(this.selectedLookupData[this.lookupModel.displayFields[0].field]);
        this.form.controls[this.key + 'Id'].setValue(this.selectedLookupData.id);
        this.opened = false;
    }

    //on double clicking the lookup row
    onDblClick = (e): void => {
        this.setLookupDataId(this.selectedLookupData.id);
        this.setLookupDataName(this.selectedLookupData[this.lookupModel.displayFields[0].field]);
        this.form.controls[this.key].setValue(this.selectedLookupData[this.lookupModel.displayFields[0].field]);
        this.form.controls[this.key + 'Id'].setValue(this.selectedLookupData.id);
        this.opened = false;
    }
}
