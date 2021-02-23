import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  toDataSourceRequestString,
  translateDataSourceResultGroups,
  DataResult,
  DataSourceRequestState,
  GroupDescriptor
} from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LookupGridDataService2 {
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
  constructor(private http: HttpClient) { }

  //fetches data from url
  public fetch(state: DataSourceRequestState, apiUrl: string): Observable<DataResult> {
    const queryStr = `${toDataSourceRequestString(state)}`; // Serialize the state
    const hasGroups = state.group && state.group.length;

    return this.http
      .get(`${apiUrl}?${queryStr}`) // Send the state to the server
      .pipe(map(({ data, total/*, aggregateResults*/ }: GridDataResult) => // Process the response
        (<GridDataResult>{
          // If there are groups, convert them to a compatible format
          data: hasGroups ? translateDataSourceResultGroups(data) : [],
          total: total,
          // Convert the aggregates if such exist
          //aggregateResult: translateAggregateResults(aggregateResults)
        })
      ))
  }

  // fetches all data from url
  public fetchAllData(filter: any, apiUrl: string): Observable<DataResult> {
    this.state.filter.filters = filter === undefined || null ? [] : filter; 
    this.state.skip = 0;
    this.state.take = 0;
    const queryStr = `${toDataSourceRequestString(this.state)}`; // Serialize the state
    const hasGroups = this.state.group && this.state.group.length;

    return this.http
      .get(`${apiUrl}?${queryStr}`) // Send the state to the server
      .pipe(map(({ data, total/*, aggregateResults*/ }: GridDataResult) => // Process the response
        (<GridDataResult>{
          // If there are groups, convert them to a compatible format
          data: hasGroups ? translateDataSourceResultGroups(data) : [],
          total: 0,
          // Convert the aggregates if such exist
          //aggregateResult: translateAggregateResults(aggregateResults)
        })
      ))
  }

}
