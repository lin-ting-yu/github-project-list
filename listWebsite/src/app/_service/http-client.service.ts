import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private option = {
    observe: 'response' as 'response'
  };
  constructor(
    private http: HttpClient
  ) { }

  get(url: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(url, this.option);
  }
}
