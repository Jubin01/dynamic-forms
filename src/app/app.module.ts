import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { MaterialModule } from './material.module';

import { SharedModule } from './shared/shared.module';
import { LookupGridDataService2 } from './shared/lookup-2/lookup-grid/data.service';
import { HttpClientModule } from '@angular/common/http';
import { TabbedAddComponent } from './tabbed-add/tabbed-add.component';



@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    TabbedAddComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule
  ],
  entryComponents: [ AddComponent,
    TabbedAddComponent],
  bootstrap: [AppComponent],
  providers: [ LookupGridDataService2],

})
export class AppModule { }
