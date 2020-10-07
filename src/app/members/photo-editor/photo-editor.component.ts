import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  //constructor() {
  //  this.uploader =
  //    new FileUploader({
  //    url: URL,
  //    disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
  //    formatDataFunctionIsAsync: true,
  //    formatDataFunction: async (item) => {
  //      return new Promise((resolve, reject) => {
  //        resolve({
  //          name: item._file.name,
  //          length: item._file.size,
  //          contentType: item._file.type,
  //          date: new Date()
  //        });
  //      });
  //    }
  //  });

  //  this.hasBaseDropZoneOver = false;


  //  this.response = '';

  //  this.uploader.response.subscribe(res => this.response = res);
  //}

  constructor(private authService: AuthService) {}

  

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 //10 mb
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    }
  }

}
