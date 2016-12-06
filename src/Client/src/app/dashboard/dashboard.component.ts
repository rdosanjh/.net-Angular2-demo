import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service'
import { UserService } from '../user-service.service'
import { IArticle } from '../Models/Article'

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles$: Observable<IArticle[]>;
  articles: IArticle[];

  constructor(private articleService: ArticleService, private userService: UserService) { }

  ngOnInit() {
    this.userService.RedirectIfNotLoggedIn();
    this.getArticles();
    this.articles$.subscribe(articles => {
      this.articles = articles;
    })
  }

  private getArticles() {
    this.articles$ = this.articleService.GetUserArticles();

  }
  
  onRemove(id: string) {
    this.articleService.RemoveArticle(id).subscribe(
      success =>{
        this.articles = this.articles.filter(a => a.id != id);
      }
    );
  }

}
