import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewserviceService {

  constructor(private _http:HttpClient) { }

  //news api url 

  newsApiuUrl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=6aa9d8da42824bbbaffae605ce0b6bfb";

  //topheading
  topHeading():Observable<any>
  {
    return this._http.get(this.newsApiuUrl);
  }
}
