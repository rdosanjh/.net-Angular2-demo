import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { environment } from '../environments/environment'


@Injectable()
export class ApiService {
  private _headers: Headers;

  constructor(private http: Http) {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  setHeader(key: string, value: string) {
    if(this._headers.get(key)){
      this.removeHeader(key);
    }
    this._headers.append(key, value);
  }

  removeHeader(key: string) {
    this._headers.delete(key);
  }

  get<T>(url, data?: T) {
    let params = new URLSearchParams();
    for (let k in data) {
      params.set(k, (data[k]));
    }
    
    return this.http.get(environment.apiUrl + url, {
      headers: this._headers,
      search: params
    });
  }

  post(url, data) {
    return this.http.post(environment.apiUrl + url, data, {
      headers: this._headers
    });
  }

  put(url, data) {
    return this.http.put(environment.apiUrl + url, data, {
      headers: this._headers
    });
  }

  delete(url) {
    return this.http.delete(environment.apiUrl + url, {
      headers: this._headers
    })
  }
}
