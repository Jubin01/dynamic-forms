import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormConfig, TabConfig } from '../shared/components/field.interface';
import { TabbedAddConfigService } from './tabbed-add-config.service';

@Component({
  selector: 'app-tabbed-add',
  templateUrl: './tabbed-add.component.html',
  styleUrls: ['./tabbed-add.component.scss']
})
export class TabbedAddComponent implements OnInit {

  tabConfig: TabConfig[]; 
  
  constructor(public dialogRef: MatDialogRef<TabbedAddComponent>,private tabbedAddConfigService: TabbedAddConfigService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tabConfig = this.tabbedAddConfigService.getConfig(this.data);
  }

  formConfig: FormConfig = { title: 'Form Title' };

  // on form submit
  submit(value: any) {
  }

}
