import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FieldConfig } from '../field.interface';
// import { UploadService } from 'src/api/services/upload.service';
//import { ErrorMessageDialogComponent } from 'src/app/shared/error-message-dialogue/dialogue.component';
//import { HostService } from 'src/app/services/host.service';

@Component({
    selector: 'app-image-caller',
    template: `
  <div class="image-div" [formGroup]="group">
    
  <div style="margin-bottom:10px;">
  <app-file-upload maxFiles="1" maxSize="2" fileExt="JPG, GIF, PNG"
  (uploadStatus)="refreshImages($event)">
  </app-file-upload>
  </div>
  
      <div fxLayoutAlign="center center" *ngIf="!imageObj">
          <div class="image-container">
              <img class="img-style-dms" [src]="imageObj"
                  onerror=" this.src = 'assets/img/no_image_en.png' " />
          </div>
      </div>
      <div fxLayoutAlign="center center" *ngIf="imageObj">
          <div class="image-container">
              <img class="img-style-dms" [src]="imageObj"
                  *ngIf="!imageName" onerror=" this.src = 'assets/img/no_image_en.png' " />
              <img class="img-style-dms" [src]="imageObj"
                  *ngIf="imageName" onerror=" this.src = 'assets/img/no_image_found.png' " />
          </div>
      </div>
  <div fxLayoutAlign="center center">
  <input type="text" hidden="true" [formControlName]="field.name" matInput value="{{imageName}}">
  <h4>{{imageName}}</h4>
  </div>



</div>
`,
    styles: [`
  .image-container {
    display: inline;
    position: relative;
    .icon-img-overlay {
      position: absolute;
      right: 0;
      background-color: grey;
      color: white;
      cursor: pointer;
    }
  }

 .img-style-dms 
 {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: auto !important;
  height:150px !important;
  max-width: 250px !important;
  min-width: 180px !important;
}

.image-div{
    display: inline-block;
    width: 32%;
}
  `]
})
export class ImageCallerComponent implements OnInit, AfterViewInit, AfterContentInit {
    host: string;
    field: FieldConfig;
    group: FormGroup;
    imageName: string;
    //    fileToUpload: any;
    imageObj: string | ArrayBuffer;
    constructor(private dialog: MatDialog) {
        this.host = "host";
    }

    ngOnInit() {
        this.imageName = this.field.value;
        this.imageObj = this.host + '/Uploads/KAPPImages/' + this.field.value;
    }
    ngAfterViewInit() {


    }
    ngAfterContentInit() {
        //  this.group.addControl(this.field.name, new FormControl({value:this.imageName}));

    }
    refreshImages(files) {
        if (files && files.length > 0) {
            this.toBase64(files[0]);
            this.group.patchValue({ image: files[0].name });
            this.imageName = files[0].name;
            this.group.controls[this.field.name].setValue(this.imageName);
        }
    }
    toBase64(file) {
        //  this.fileToUpload = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.imageObj = reader.result;
            this.uploadFile(file);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    uploadFile(file) {
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);

            //upload logic

            // this.uploadService.postImage(formData)
            // .then(() => {
            //     // this.onAddComplete.next(data);
            //     // this.dialogRef.close();
            // })
            // .catch((err) => {                         
            //     if(err.error != undefined)
            //     {  
            //         if (err.error.error.message.includes('The process cannot access the file')) 
            //         {        
            //         }
            //         else 
            //         {
            //             const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
            //             width: 'fit-content',
            //             data: { content: err.error, alertType: 'error', language: 'en', help: false }
            //             });
            //         } 
            //     } 
            // });

        }
    }
}