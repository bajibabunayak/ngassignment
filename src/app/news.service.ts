import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiKey = 'fb66dc0cb5934241bced0ddfb8b85a5f';
  newsEverything = 'https://newsapi.org/v2/everything';
  
  constructor(private _http: HttpClient) { }

  
  getEverythingNews(searchItem:any){
    return this._http.get(`${this.newsEverything}?q=${searchItem}&apiKey=${this.apiKey}`);
  }
}
