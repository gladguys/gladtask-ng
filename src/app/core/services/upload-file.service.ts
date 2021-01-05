import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GTConstants } from '../../GT-constants';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File, folder: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('folder', folder);

    const req = new HttpRequest(
      'POST',
      `${GTConstants.GLADTASK_UPLOAD_PATH}`,
      formdata,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );

    return this.http.request(req);
  }
}
