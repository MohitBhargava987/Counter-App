import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  headers: any;
  timeoutError: any;
  constructor(private http: HttpClient, private route: Router) { }

  api(_data: any, url: any, flag: any, method?: string): Observable<any> {

    let api_url = "http://localhost:3000/";
    let output;
    let hitting_url = api_url + url;
    if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
      hitting_url = url;
    }
    if (method === 'get') {
      output = this.http.get<any>(hitting_url, { headers: this.headers });
    }
    else if (method === 'put') {
      output = this.http.put<any>(hitting_url, (_data), { headers: this.headers });
    } else if (method === 'object') {

      output = this.http.post<any>(hitting_url, (_data));
    }
    else {
      output = this.http.post(hitting_url, (_data), { responseType: 'text' });
    }

    return output
      .pipe(
        timeout(60000),
        map((data: any) => {
          console.log(data, 'data');

          if (data.flag === 377) {
            return false;
          }
          if (data && flag) {
            if (data.err) {
              console.log(data.err);

            } else {
              // this.customPopups(data.flag, data.is_error);
            }
          }
          return data;
          // return JSON.parse(data);
        }),
        catchError((error: any) => {
          if (error instanceof TimeoutError) {
            if (!this.timeoutError) {
              this.timeoutError = true;
              '/Request Timeout'
            }
            return throwError({ error: 'Timeout Exception' });
          }
          if (error.status === 0) {
            if (!this.timeoutError) {
              // 'Unable to fetch data from server'
            }
          }
          if (error.status === 404) {
            if (!this.timeoutError) {
              //'Invalid Request - URL not found'
            }
          }
          return throwError(error);
        })
      );
  }

}
