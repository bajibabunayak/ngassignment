import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalArticles: any[] = [];
  articles: any[] = [];
  totalPages: number[] = [];
  pages: number[] = [];
  activePage = 1;
  intervalCall:any;
  searchItem = null;
  constructor(private _news_service: NewsService) {}
  ngOnInit(): void {
    this.getAllNews();
    this.intervalCall = setInterval(() => {
      this.searchItem = null;
      this.getAllNews();
    }, 1000*60);
  }
  getAllNews(){
    
    this._news_service.getEverythingNews(this.searchItem).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.totalArticles = res.articles;
        this.articles = this.totalArticles.slice(0,10);
        let totalpages = Math.ceil(this.totalArticles.length / 10);
        for (let i = 0; i < totalpages; i++) {
          this.totalPages.push(i + 1);
        }
        this.pages =this.totalPages.slice(0, 3);
        this.activePage = 1;
      }
    });
  }
  gotoPage(page: number){
    this.activePage = page;
    if(this.activePage%3==0){
      this.pages = this.totalPages.slice(this.activePage-1, this.activePage+2);
    } 
    this.articles = this.totalArticles.slice((this.activePage-1)*10,(this.activePage-1)*10+10); 
  }
  previousPage(){
    if(this.activePage>1){
      this.activePage--;
      this.pages = this.totalPages.slice(this.activePage-1, this.activePage+2);
      this.articles = this.totalArticles.slice((this.activePage-1)*10,(this.activePage-1)*10+10);
    }
  }
  nextPage(){
    if(this.activePage < this.totalPages.length){
      this.activePage++;
      if(this.activePage%3==0){
        this.pages = this.totalPages.slice(this.activePage-1, this.activePage+2);
      }
      this.articles = this.totalArticles.slice((this.activePage-1)*10,(this.activePage-1)*10+10);
    }
  }
  onKeyEnter(){
    this.searchItem = this.searchItem === ''?null:this.searchItem;
    this.getAllNews();
  }
}
