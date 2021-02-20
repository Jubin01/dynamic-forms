import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fileURLToPath } from 'url';
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
    errors: Array<string> = [];
    dragAreaClass = 'drag-area';
    @Input() fileExt = 'JPG, JPEG, GIF, PNG';
    @Input() maxFiles = 5;
    @Input() maxSize = 5; // 5MB
  //  @Input() form: FormGroup;
    @Output() uploadStatus = new EventEmitter();

    constructor() { }

    ngOnInit() {
      //  this.form.addControl(this.field.name, new FormControl({value:this.imageName}));
     }

    onFileChange(event) {
        event.preventDefault();
        const files = event.target.files;
        this.saveFiles(files);
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = 'drop-area';
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        this.dragAreaClass = 'drop-area';
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
        this.dragAreaClass = 'drag-area';
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = 'drag-area';
        event.preventDefault();
    }

    @HostListener('drop', ['$event']) onDrop(event) {
        this.dragAreaClass = 'drag-area';
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        this.saveFiles(files);
    }

    saveFiles(files) {
        this.errors = [];
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit([]);
            return;
        }
        if (files.length > 0) {
            this.dragAreaClass = 'drag-area';
            this.uploadStatus.emit(files);
            files = [];
        }
    }

    private toBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            alert(reader.result);
            return reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    private isValidFiles(files) {
        // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
            return;
        }
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
        // Make array of file extensions
        const extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim() });
        for (let i = 0; i < files.length; i++) {
            // Get file extension
            const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            const exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push('Error (Extension): ' + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }

    private isValidFileSize(file) {
        const fileSizeInMB = file.size / (1024 * 1000);
        const size = Math.round(fileSizeInMB * 100) / 100;
        if (size > this.maxSize) {
            this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
        }

    }


}

