import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  baseUrl = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  upload(fileData: any):Observable<any> {
    console.log('File upload service: ', fileData);
    return this.http.post(this.baseUrl, fileData);
  }
}
