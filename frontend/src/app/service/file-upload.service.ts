import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(private http:HttpClient) { }

  upload(fileData: any):Observable<any> {
    return this.http.post(`${environment.server_url}/users/upload`, fileData);
  }
}
