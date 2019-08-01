import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { messages, config } from './app.config';

const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filename: string;
  minFileSize = config.MIN_FILE_SIZE; // 50 MB
  maxFileSize = config.MAX_FILE_SIZE; // 2GB
  fileExtentions = config.FILE_EXTENSIONS;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      if(this.valideFile(file, this.uploader)){
        this.filename = file._file.name; file.withCredentials = false;
      }
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.filename = '';
        alert(messages.FILE_SUCCESS);
    };
 }

 valideFile(file,uploader){
  if(!this.IsValidExtension(file) || !this.IsValidSize(file)){
    uploader.clearQueue();
    return false;
  }
  return true;
 }

 IsValidSize(file){
    const fileSizeinMB = file._file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100;
    if(size < this.minFileSize || size > this.maxFileSize){
      alert(messages.ERR_FILE_SIZE);
      return false;
    }
    return true;
 }

 IsValidExtension(file){
    const ext: string = file._file.type;
    if(this.fileExtentions.indexOf(ext) ===-1){
      alert(messages.ERR_FILE_EXTN);
      return false;
    }
    return true;
 }

 cancelFileOperation(){
  this.filename = '';
  this.uploader.clearQueue();
 }

}
