//service to send data to api

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  //import and inject http client
  _url = '';
  constructor(private _http: HttpClient) {}
  register(userData: any) {
    return this._http.post<any>(this._url, userData);
  }
}
