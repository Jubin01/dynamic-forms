import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { LookupGridDataService2 } from './data.service';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DataSourceRequestState, GroupDescriptor } from '@progress/kendo-data-query';
import { Lookup } from 'src/app/models/lookup';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lookup-grid-2',
  templateUrl: './grid.component.html'
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LookupGridComponent2 implements OnInit, AfterViewInit, OnDestroy {
  //@ViewChild('filterElement') filterElement: ElementRef;
  //@ViewChild('stringFilterElement') stringFilterElement: ElementRef;
  @Input() lookupModel: Lookup;
  @Output() selectedData: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridRowDblClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() filter: any;
  public records: GridDataResult;
  public mySelection: number[] = [];
  toReturnData = {};

  fetchDataSubscription: Subscription;
  public groups: GroupDescriptor[] = [];
  public state: DataSourceRequestState = {
    skip: 0,
    take: 20,
    group: this.groups,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };

  constructor(
  //  private cd: ChangeDetectorRef,
     private dataService: LookupGridDataService2) {
  }

  ngAfterViewInit() {
    //  this.filterElement.nativeElement.children[0].children[0].children[0].children[0].focus();
    //    this.stringFilterElement.nativeElement.focus();
  //     setTimeout(() => {
  //   this.filterElement.nativeElement.querySelector("input").focus();
  //  // this.cd.markForCheck();
  //    }, 0);
  }

  ngOnInit() {
    this.state.filter.filters = this.filter === undefined || null ? [] : this.filter;
    this.fetchDataSubscription = this.dataService.fetch(this.state, this.lookupModel.apiUrl).subscribe((r: any) => {
      this.records = r;

      const selectedData = r.data[0];
      this.lookupModel.returnFields.forEach(function (value) {

        for (const key in selectedData) {
          if (selectedData.hasOwnProperty(key)) {
            const element = selectedData[key];
            if (value === key) {
              this.toReturnData[key] = element;
            }
          }
        }
      }.bind(this));

      if (r.data.length > 0) {
        this.mySelection = [r.data[0].id];
        this.selectedData.emit(this.toReturnData);
      }

    });
  }

  ngOnDestroy() {
    this.fetchDataSubscription.unsubscribe();
  }

  //called on any state changed in grid
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.dataService.fetch(state, this.lookupModel.apiUrl)
      .subscribe((r: any) => {
        this.records = r;

        const selectedData = r.data[0];
        this.lookupModel.returnFields.forEach(function (value) {

          for (const key in selectedData) {
            if (selectedData.hasOwnProperty(key)) {
              const element = selectedData[key];
              if (value === key) {
                this.toReturnData[key] = element;
              }
            }
          }
        }.bind(this));

        if (r.data.length > 0) {
          this.mySelection = [r.data[0].id];
          this.selectedData.emit(this.toReturnData);
        }
      }
      );
  }

  gridUserSelectionChange(selection) {
    const selectedData = selection.selectedRows[0].dataItem;
    this.lookupModel.returnFields.forEach(function (value) {

      for (const key in selectedData) {
        if (selectedData.hasOwnProperty(key)) {
          const element = selectedData[key];
          if (value === key) {
            this.toReturnData[key] = element;
          }
        }
      }
    }.bind(this));
    this.selectedData.emit(this.toReturnData);
  }

  onDblClick(e) {
    if (e.target.nodeName === 'TD' && e.target.offsetParent.className) {
      this.gridRowDblClick.next('');
    }
  }
}
