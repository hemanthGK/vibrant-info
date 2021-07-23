import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authorization: any;
  apiHeaders: any;
  error: any = {};

  constructor(private http: HttpClient) {}

  callPostAPI(url: string, parameters: any) {
    return this.http.post<any>(url + url, parameters)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  callGetAPI(url: string) {
    return this.http.get<any>(url)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  callDeleteAPI(url: string) {
      return this.http.delete<any>(url)
        .pipe(map(
          data => {
            return data;
          }
        ));

  }

  callPutAPI(url: string, parameters: any) {
    return this.http.put<any>(url, parameters)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }
}
