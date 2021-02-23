import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { TabbedAddComponent } from './tabbed-add/tabbed-add.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialog: MatDialog){}
  onButtonClick(){
    const dialogRef = this.dialog.open(AddComponent, { data: {'selectedRow': {}, 'type':'add'}});

  }

  onTabbedAddButtonClick(){
    const dialogRef = this.dialog.open(TabbedAddComponent, { data: {'selectedRow': {}, 'type':'add'}});

  }
}
