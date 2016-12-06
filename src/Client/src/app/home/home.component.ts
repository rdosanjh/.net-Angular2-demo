import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service'
import {UserService} from '../user-service.service'
import {Observable} from 'rxJS/Observable'
import {IArticle} from '../Models/article'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  articles$ : Observable<IArticle[]>;
  constructor(private articleService: ArticleService, private userService : UserService) { }

  ngOnInit() {
    this.userService.RedirectIfNotLoggedIn();
    this.articles$ = this.articleService.GetAllArticles();
  }
}
