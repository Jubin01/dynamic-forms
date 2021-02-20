import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { MaterialModule } from './material.module';

import { SharedModule } from './shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { LookupGridDataService2 } from './shared/lookup-2/lookup-grid/data.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AddComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    GridModule,
    WindowModule,
    DialogsModule
  ],
  bootstrap: [AppComponent],
  providers: [ LookupGridDataService2],

})
export class AppModule { }
